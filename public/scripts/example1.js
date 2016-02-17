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
        this.setState({data: dataStore, includeOutOfStock: true, filterText: ""});
      },
      calculateList: function(filterText, includeOutOfStock){
        var newData = dataStore.filter(function(item){
                        return (includeOutOfStock || item.stocked) && item.name.startsWith(filterText);
                      })
        this.setState({data: newData, includeOutOfStock: includeOutOfStock, filterText: filterText});
      },
      handleFilter: function(e){
        this.calculateList(e.target.value, this.state.includeOutOfStock);
      },
      handleOutOfStock: function(e){
        this.calculateList(this.state.filterText, e.target.checked)
      },
      render : function(){
       

        return (
          <div className='ComponentBox'>
          <h3> Catalogue</h3>
          <SearchBox handleFilter={this.handleFilter} handleOutOfStock={this.handleOutOfStock} includeOutOfStock={this.state.includeOutOfStock}></SearchBox>
          <CategoriesContainer data={this.state.data}></CategoriesContainer>
          </div>
          );
    }
  }
);

var CategoriesContainer = React.createClass({
      render: function(){
        var fdata = {};
        this.props.data.forEach(function(obj){
          fdata[obj.category] = (fdata[obj.category] || []);
          fdata[obj.category].push(obj);
        });
        var cboxes = Object.keys(fdata).map(function(category, index){
          return (<CategoryBox key={index} category={category} items={fdata[category]}></CategoryBox>);
        });
        return (<div>{cboxes}</div>);
      }
});

var SearchBox = React.createClass(
  {
    render : function(){
      return (
      <div>
          <input className="textBox" type="text" onChange={this.props.handleFilter} placeholder="Search..."></input>
          <br/>
          <input type="checkBox" checked={this.props.includeOutOfStock} onChange={this.props.handleOutOfStock} id ="checkbox_id">Include out of stock</input>
          </div>
        );
    }
  }
);

var CategoryBox = React.createClass(
  {
    render : function(){
      var items = this.props.items.map(function(item, index){
        return (<LineItem key={index} item={item}></LineItem>);
      });
      return (<table>
          <tbody>
            <tr><th colSpan="2">{this.props.category}</th></tr>
            {items}
          </tbody>  
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
              ReactDOM.render(<ComponentBox></ComponentBox>,document.getElementById('content'));
      });

