import React from 'react';


class ShoeColumn extends React.Component {
    constructor(props) {
        super(props);
        this.deleteEntry = this.deleteEntry.bind(this);
      }

    async deleteEntry(shoe) {
        const url = 'http://localhost:8080' + shoe;
        const fetchConfig = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        window.location.reload(false);


    await fetch(url, fetchConfig)
    }

    render() {
        return (
        <div className="col">
            {this.props.list.map(data => {
            const shoe = data;
            return (
                <div key={shoe.href} className="card mb-3 shadow">
                <img src={shoe.picture_url} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{shoe.manufacturer}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                    {shoe.model_name}
                    </h6>
                    <p className="card-text"> Color: {shoe.color}</p>
                    <p className="card-text"> Href: {shoe.href}</p>
                </div>
                <div className="card-footer">
                    <p>Closet: {shoe.bin.closet_name}</p>
                    <p>Bin: {shoe.bin.bin_number}</p>
                    <button className="btn btn-primary" onClick={() => this.deleteEntry(shoe.href)}>Delete</button>
                </div>
                </div>
            );
            })}
        </div>
        );
    }
}

  export default ShoeColumn;
