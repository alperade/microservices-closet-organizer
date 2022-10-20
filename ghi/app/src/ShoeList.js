import React from 'react';
import { Link } from 'react-router-dom';


function ShoeColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const shoe = data;
        console.log(shoe)
        return (
          <div key={shoe.href} className="card mb-3 shadow">
            <img src={shoe.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{shoe.manufacturer}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.model_name}
              </h6>
              <p className="card-text">
                {shoe.color}
              </p>
            </div>
            <div className="card-footer">
             <p>Closet: {shoe.bin.closet_name}</p>
            <p>Bin: {shoe.bin.bin_number}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class ShoeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoeColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/shoes/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(detailUrl));
        }

        const responses = await Promise.all(requests);

        const shoeColumns = [[], [], []];

        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            shoeColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }
        this.setState({shoeColumns: shoeColumns});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <h1 className="display-5 fw-bold">Shoes List</h1>
        </div>
        <div className="container">
          <div className="row">
            {this.state.shoeColumns.map((shoeList, index) => {
              return (
                <ShoeColumn key={index} list={shoeList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ShoeList;
