    var dataStore = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

  var ComponentBox = React.createClass(
    {
      getInitialState: function() {
        return {includeOutOfStock: true, filterText: ""};
      },
      componentDidMount: function() {
        this.setState({includeOutOfStock: true, filterText: ""});
      },
      calculateList: function(){
        var filterText = this.state.filterText;
        var includeOutOfStock = this.state.includeOutOfStock;
        var newData = dataStore.filter(function(item){
                        return (includeOutOfStock || item.stocked) && item.name.startsWith(filterText);
                      })
        return newData;
      },
      handleFilter: function(filterText, includeOutOfStock){
        this.setState({filterText: filterText, includeOutOfStock: filterText, includeOutOfStock});
      },
      render : function(){
       
        var filteredData = this.calculateList();
        return (
          <div className='ComponentBox'>
            <h3> Catalogue</h3>
            <SearchBox handleFilter={this.handleFilter} filterText={this.state} includeOutOfStock={this.state.includeOutOfStock}></SearchBox>
            <ProductTable data={filteredData}></ProductTable>
          </div>
          );
    }
  }
);

var SearchBox = React.createClass(
  {
    handleFilter: function(){
      this.props.handleFilter(
          this.refs.filterText.value,
          this.refs.includeOutOfStock.checked
        )
    },
    render : function(){
      return (
      <div>
          <input className="textBox" type="text" onChange={this.handleFilter} ref="filterText" placeholder="Search..."></input>
          <br/>
          <input type="checkBox" checked={this.props.includeOutOfStock} ref="includeOutOfStock" onChange={this.handleFilter} id ="checkbox_id">{' '}Include out of stock</input>
          </div>
        );
    }
  }
);"    m   n... .      ["""]
var ProductTable = React.createClass({
      render: function(){
        var fdata = {};
        this.props.data.forEach(function(obj){
          fdata[obj.category] = (fdata[obj.category] || []);
          fdata[obj.category].push(obj);
        });
        var cboxes = Object.keys(fdata).map(function(category, index){
          return (<CategoryBox key={index} category={category} items={fdata[category]}></CategoryBox>);
        });
        return (<table>{cboxes}</table>);
      }
});

var CategoryBox = React.createClass(
  {
    render : function(){
      var items = this.props.items.map(function(item, index){
        return (
              
              <LineItem key={index} item={item}></LineItem>
          );
      });
      return (
            <tbody>
              <tr><th colSpan="2">{this.props.category}</th></tr>
              {items}
              </tbody>
            
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
              ReactDOM.render(<ComponentBox></ComponentBox>,document.getElementById('content'));
      });

