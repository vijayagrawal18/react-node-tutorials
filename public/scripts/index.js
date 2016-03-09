
window.data = (window.data || {} );
window.appendExample = function(header, renderer){
	window.data[header] = {render: renderer};
	ReactDOM.render(<MasterHeader data={data}></MasterHeader>, document.getElementById("header"));	
}			
var MasterHeader = React.createClass({
	loadExample : function(e){
			$('#content').empty();
			var element = this.props.data[e.target.innerHTML];
			if(!!element)
				element.render('content');
			else
				alert("Not implemented");
			
		},
	componentDidUpdate : function() {
			// Remove below line.
			var element = this.props.data['Todo List'];
			if(!!element)
				element.render('content');
	},
	render: function(){
		
		var links = Object.keys(this.props.data).map((link, index) => {
			return (<a href="#" onClick={this.loadExample} key={index} style={{margin:15}}>{link}</a>)
		});
		
		return (<div className="header">
			{links}
			</div>
		);
	}
});

