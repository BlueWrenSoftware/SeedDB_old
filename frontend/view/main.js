function copy(obj) {
	var newObj = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = obj[key];
		}
	}
	return newObj;
}

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
		this.setState({isEditing: true})
	},
	doSave: function(event) {
		this.setState({isEditing: false})
		
	},
	handleSeedChange: function(propName, event) {
		this.props.onSeedChange(this.props.key, propName, event.target.value);
		this.props.seed[propName] = event.target.value;
	},
	render: function() {
		var seed = this.props.seed;
		
		if (this.state.isEditing) {
			return (
				<div>
					<select value={this.props.seed.seedTypeName} onChange={this.handleSeedChange.bind(this, "seedTypeName")}>
						{this.props.seedTypeOptions}
					</select>
					<input type="text" value={this.props.seed.seedVarietyName} onChange={this.handleSeedChange.bind(this, "seedVarietyName")}></input>
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
					<a href={"seed/" + this.props.seed.seedId}>
						<span>{this.props.seed.seedTypeName}</span>
						<span>{this.props.seed.seedVarietyName}</span>
						<span>{this.props.seed.seedPacketCount}</span>
						<span>{this.props.seed.totalSeedCount}</span>
						<span>{this.props.seed.totalSeedGram}</span>
					</a>
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
		var seed = copy(this.state.seeds[rowIdx])
		seed[prop] = val 
		var seedList = this.state.seeds.slice();
		seedList[rowIdx] = seed;
		this.setState({seeds: seedList,
			seedTypes: this.state.seedTypes});
	},
	render: function() {
		var idx = 0;
		var handleSeedChange = this.handleSeedChange;
			
		var seedTypeOptions = this.state.seedTypes.map(function(seedType) {
			return <option value={seedType.seedTypeName} key={seedType.seedTypeId}>{seedType.seedTypeName}</option>
		});
		
		var seedNodes = this.state.seeds.map(function(seed) {
			var currIdx = idx;
			idx = idx + 1;
			return (
				<SeedLine seed={seed} key={idx} seedTypeOptions={seedTypeOptions}
				onSeedChange={handleSeedChange}/>
			);
		});
			
		return (<div>{seedNodes}</div>);
	}
});

ReactDOM.render(
	<SeedList />,
	document.getElementById('content')
);
