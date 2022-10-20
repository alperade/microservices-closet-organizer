import React from 'react';

class  HatsList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        "hats": [],
      }
      this.dlt = this.dlt.bind(this)
      this.refresh = this.refresh.bind(this)
    }
      async refresh(){
        const url = 'http://localhost:8090/api/hats'
        const response = await fetch(url)
        if (response.ok){
          const data = await response.json()
          this.setState({ hats: data.hats})
        }
      }
      async componentDidMount(){
        this.refresh()
      }
      async dlt(event){
        const url =`http://localhost:8090/api/hats/${event}/`
        const fetchConfig = {
          method : "delete",
          headers : {
            "Content-Type": "application/json"
          }
        }
        await fetch (url, fetchConfig)
        this.refresh()

      }

    render(){


    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Style Name</th>
              <th> Fabric </th>
            </tr>
          </thead>
          <tbody>
            {this.state.hats.map((hat) => {
              return (
                <tr key={hat.id}>
                  <td>{ hat.style_name }</td>
                  <td>{ hat.fabric }</td>
                  <td>
                  <form>
                    <button onClick={() => this.dlt(hat.id)}>Delete</button>
                  </form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default HatsList;
