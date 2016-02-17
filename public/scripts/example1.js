    var dataStore = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

  window.ComponentBox = React.createClass(
    {
      getInitialState: function() {
        return {data: [], includeOutOfStock: true, filterText: ""};
      },
      componentDidMount: function() {
        this.setState({data: [], includeOutOfStock: true, filterText: ""});
      },
      calculateList: function(filterText, includeOutOfStock){
        var newData = dataStore.filter(function(item){
                        return (includeOutOfStock || item.stocked) && item.name.startsWith(filterText);
                      })
        this.setState({data: newData, includeOutOfStock: includeOutOfStock, filterText: filterText});
        console.log(newData);
      },
      handleFilter: function(e){
        this.calculateList(e.target.value, this.state.includeOutOfStock);
      },
      render : function(){
        var fdata = {};
        this.state.data.forEach(function(obj){
          fdata[obj.category] = (fdata[obj.category] || []);
          fdata[obj.category].push(obj);
        });
        var cboxes = Object.keys(fdata).map(function(category){
          return (<CategoryBox category={category} items={fdata[category]}></CategoryBox>)
        });

        return (
          <div className='ComponentBox'>
          <h3> Catalogue</h3>
          <SearchBox handleFilter={this.handleFilter}></SearchBox>
          {cboxes}
          </div>
          );
    }
  }
);

var SearchBox = React.createClass(
  {
    render : function(){
      return (<input type="text" onChange={this.props.handleFilter} placeholder="Search..."></input>);
    }
  }
);

var CategoryBox = React.createClass(
  {
    render : function(){
      var items = this.props.items.map(function(item){
        return (<LineItem item={item}></LineItem>);
      });
      return (<table>
          <tr><th colSpan="2">{this.props.category}</th></tr>
          {items}
        </table>
      );
    }
  }
);
  
  var LineItem = React.createClass(
  {
    render: function() {
    var name = this.props.item.stocked ?
      this.props.item.name :
      <span style={{color: 'red'}}>
        {this.props.item.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.item.price}</td>
      </tr>
    );
  }

  }
);

appendExample("Basic Table",
      function(){
              ReactDOM.render(<ComponentBox data = {dataStore}></ComponentBox>,document.getElementById('content'));
      });

