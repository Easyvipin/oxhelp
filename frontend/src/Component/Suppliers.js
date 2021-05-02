import React from "react";
import axios from "axios";
import Loader from "./Loader";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import moment from "moment";

const Suppliers = () => {
  const { city } = useParams();
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [supplyList, setSupplyList] = React.useState(null);

  React.useEffect(() => {
    /* make api call to fetch all the suppliers */
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/suppliers/${city}`);
        setLoading(false);
        setSupplyList(data.supplyData);
      } catch (err) {
        console.log("check your internet");
      }
    };
    getData();
  }, [city]);
  return (
    <>
      {loading ? (
        <Loader message="Fetching Suppliers..." />
      ) : (
        <section className="p-3 supplier-list pb-5">
          <Button
            onClick={() => history.goBack()}
            className="btn btn-primary btn-sm btn-block my-2"
          >
            Back To Search
          </Button>
          {supplyList ? (
            supplyList.map((item) => {
              return (
                <div key={item._id} class="card text-white bg-info mb-3">
                  <div class="card-header">
                    <h5 className="text-light">{item.authorName}</h5>
                    <span>{moment(item.updatedAt).fromNow()}</span>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">{item.org}</h4>
                    <i className="fas fa-map-marker-alt"></i>
                    <p class="card-text">{item.location}</p>
                    <div className="text-left d-flex flex-wrap ">
                      {item.helplines.map((phone, index) => {
                        if (phone.length > 0) {
                          return (
                            <a
                              key={index}
                              className="p-2 bg-primary m-1 text-light"
                              href={`tel:${phone}`}
                            >
                              <i className="fas fa-phone mx-1"></i>
                              {phone}
                            </a>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* on no result */
            <div className="text-center">
              <h6>No Suppliers Yet..</h6>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Suppliers;
