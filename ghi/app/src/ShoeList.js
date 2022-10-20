import React from 'react';
import { Link } from 'react-router-dom';
import ShoeColumn from './ShoeColumn';



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
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Add a shoe</Link>
         </div>
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
