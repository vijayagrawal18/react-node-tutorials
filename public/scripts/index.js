
window.data = (window.data || {} );
window.appendExample = function(exmaple, renderer){
	window.data[exmaple] = {render: renderer};
	ReactDOM.render(<MasterHeader></MasterHeader>, document.getElementById("header"));	
}			
var MasterHeader = React.createClass({
	
	render: function(){

		var loadExample= function(e){
			$('#content').empty();
			var element = data[e.target.innerHTML];
			if(!!element)
				element.render();
			else
				alert("Not implemented");
			
		};
		var links = Object.keys(data).map(function(link, index){
			return (<a href="#" onClick={loadExample} key={index} style={{margin:15}}>{link}</a>)
		});
		return (<div className="header">
			{links}
			</div>
		);
	}
});

