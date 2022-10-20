import React from 'react';

class ShoeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        manufacturer: '',
        model_name: '',
        color: '',
        picture_url: '',
        bin: '',
        bins: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/bins/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ bins: data.bins });
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.bins;

    const locationUrl = `http://localhost:8080/api/shoes/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe);
      this.setState({
        manufacturer: '',
        model_name: '',
        color: '',
        picture_url: '',
        bin: '',
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new shoe</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.manufacturer} placeholder="manufacturer" required type="text" id="manufacturer" className="form-control" />
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.model_name} placeholder="Model name" required type="text" id="model_name" className="form-control" />
                <label htmlFor="model_name">Model name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.color} placeholder="Color" type="text" id="color" className="form-control" />
                <label htmlFor="company_name">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.picture_url} placeholder="Picture Url" required type="text" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture url</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.bin} required className="form-select" id="bin">
                  <option value="">Choose a bin</option>
                  {this.state.bins.map(bin => {
                    return (
                      <option key={bin.id} value={bin.href}>{bin.closet_name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoeForm;
