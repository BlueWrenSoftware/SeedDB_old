var $ = require('jquery');
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link

function copy(obj) {
	var newObj = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = obj[key];
		}
	}
	return newObj;
}

var Seed = React.createClass({
	getInitialState: function () {
		return {seed: []};
	},
	
	componentDidMount: function() {
		$.ajax({
			url: 'api/seed',
			contentType: 'text/plain',
			dataType: 'json',
			cache: false,
			data: {seedId: this.props.params.seedId},
			success: function(data) {
				this.setState({seed: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('api/seed', status, err.toString());
			}.bind(this)
		});
	},
	
	render: function() {
		return (
			<div>
				<h2>{this.state.seed.seedId}</h2>
			</div>
		)
	}
});

var SeedLine = React.createClass({
	propTypes: {
		seed: React.PropTypes.object.isRequired,
		// Will be called with a cell's name and its new value
		onSeedChange: React.PropTypes.func.isRequired,
		seedTypeOptions: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
		return {isEditing: false};
	},
	doEdit: function(event) {
		this.setState({isEditing: true});
	},
	doSave: function(event) {
		this.setState({isEditing: false});
		this.props.onSaveSeed(this.props.seedIdx);
		
	},
	handleSeedChange: function(propName, event) {;
		
		this.props.onSeedChange(this.props.seedIdx, propName, event.target.value);
		this.props.seed[propName] = event.target.value;
	},
	render: function() {
		var seed = this.props.seed;
		
		if (this.state.isEditing) {
			return (
				<div>
					<select value={this.props.seed.seedTypeName}
						onChange={this.handleSeedChange.bind(this, "seedTypeName")}
						seedIdx={this.props.seedIdx}>
						{this.props.seedTypeOptions}
					</select>
					<input type="text"
						value={this.props.seed.seedVarietyName}
						seedIdx={this.props.seedIdx}
						onChange={this.handleSeedChange.bind(this, "seedVarietyName")}>
					</input>
					<span>{this.props.seed.seedPacketCount}</span>
					<span>{this.props.seed.totalSeedCount}</span>
					<span>{this.props.seed.totalSeedGram}</span>
					<button onClick={this.doSave}>save</button>
				</div>
			)
		}
		else {
			return (
				<div>
					<Link to={'/seed/' + this.props.seed.seedId}>
						<span>{this.props.seed.seedTypeName}</span>
						<span>{this.props.seed.seedVarietyName}</span>
						<span>{this.props.seed.seedPacketCount}</span>
						<span>{this.props.seed.totalSeedCount}</span>
						<span>{this.props.seed.totalSeedGram}</span>
					</Link>
					<button onClick={this.doEdit}>edit</button>
				</div>
			)
		}
	}
	
});

var SeedList = React.createClass({
	getInitialState: function () {
		return {seeds: [],
			seedTypes: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: 'api/seedlist',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({seeds: data,
					seedTypes: this.state.seedTypes});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('api/seedlist', status, err.toString());
			}.bind(this)
		});
		$.ajax({
			url: 'api/seedtypes',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({seeds: this.state.seeds,
					seedTypes: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('api/seedlist', status, err.toString());
			}.bind(this)
		});
	},
	handleSeedChange: function (rowIdx, prop, val, callback) {
		console.log(rowIdx);
		var seed = copy(this.state.seeds[rowIdx]);
		seed[prop] = val;
		// set the seedTypeId, in case the seedTypeName has changed
		seed['seedTypeId'] = _.result(
			_.find(this.state.seedTypes, 'seedTypeName', seed['seedTypeName']),
			'seedTypeId');
		var seedList = this.state.seeds.slice();
		seedList[rowIdx] = seed;
		this.setState({seeds: seedList,
			seedTypes: this.state.seedTypes});
	},
	saveSeed: function(rowIdx) {
		var seed = copy(this.state.seeds[rowIdx]);
		$.ajax({
			type: 'POST',
			url: 'api/seed',
			data: JSON.stringify(seed),
			contentType: 'application/json',
			content: 'json',
			success: function(data, status, jqXHR) {
				console.log(data);
				console.log(status);
				console.log(jqXHR);
				var seedList = this.state.seeds.slice();
				seedList[rowIdx] = data;
				//this.setState({seeds: seedList,
				//	seedTypes: this.state.seedTypes});
			}.bind(this),			
			error: function(xhr, status, err) {
				console.error('api/seed', status, err.toString());
			}.bind(this),			
		});
	},
	render: function() {
		var idx = 0;
		var handleSeedChange = this.handleSeedChange;
		var saveSeed = this.saveSeed;
			
		var seedTypeOptions = this.state.seedTypes.map(function(seedType) {
			return <option value={seedType.seedTypeName} key={seedType.seedTypeId}>{seedType.seedTypeName}</option>
		});
		
		var seedNodes = this.state.seeds.map(function(seed) {
			var currIdx = idx;
			idx = idx + 1;
			return (
				<SeedLine seed={seed} key={currIdx} seedIdx={currIdx} seedTypeOptions={seedTypeOptions}
				onSeedChange={handleSeedChange} onSaveSeed={saveSeed}/>
			);
		});
			
		return (<div>{seedNodes}</div>);
	}
});

ReactDOM.render(	
	<Router>
		<Route path="/" component={SeedList}>
		</Route>
		<Route path="seed/:seedId" component={Seed}>
		</Route>
	</Router>,
	document.getElementById('content')
);
