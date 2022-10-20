import React from 'react';

class HatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fabric: '',
        style_name: '',
        color: '',
        picture_url: '',
        location: '',
        locations: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFabric = this.handleChangeFabric.bind(this);
    this.handleChangeStyle_name = this.handleChangeStyle_name.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangePicture_url = this.handleChangePicture_url.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);

  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.locations;

    const hatUrl = 'http://localhost:8090/api/hats/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {

      this.setState({
        fabric: '',
        style_name: '',
        color: '',
        picture_url: '',
        location: '',
      });
    }
  }


  handleChangeFabric(event) {
    const value = event.target.value;
    this.setState({ fabric: value });
  }

  handleChangeStyle_name(event) {
    const value = event.target.value;
    this.setState({ style_name: value });
  }

  handleChangeColor(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleChangePicture_url(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }

  handleChangeLocation(event) {
    const value = event.target.value;
    this.setState({ location: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeFabric} value={this.state.fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeStyle_name} value={this.state.style_name} placeholder="Style name" required type="text" name="style_name" id="style_name" className="form-control" />
                <label htmlFor="style_name">Style name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeColor} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePicture_url}value={this.state.picture_url} placeholder="Picture url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture url</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeLocation} value={this.state.location} required name="location" id="location" className="form-select">
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return (
                      <option key={location.href} value={location.href}>{location.closet_name}</option>
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

export default HatForm;
