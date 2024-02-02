import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from './Loader';

function App() {

  let [val, setval] = useState([])
  let [serach,setserach] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        setval(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [])

  let serachhender = () =>{
      let ser = val.filter((ele,ind) =>{
        return(
            ele.name === serach
        )
      })

      setval(ser)
  }



  return (
    <>
    {
      val.length=='0' ? <Loader></Loader> : <div className='section'>
      <Container>
        <div className='hed'>
          <div className="nav d-flex justify-content-between w-100 align-items-center">
            <div className="left">
              <div className="left-img">
                <img src={require(`./images/1.png`)} ></img>
              </div>
            </div>
            <div className="right">
              <div className="button">
                <button>Docs</button>
                <button>About</button>
                <button className='btn'>SUPPORT US</button>
              </div>
            </div>  
          </div>
          <Row>
            <Col className='header p-100'><h1>The Rick and Morty API</h1></Col>
          </Row>
          <Row>
            <Col>
              <input type="text" onChange={(e) => setserach(e.target.value)} ></input>
              <input type="button" value={"serach"} onClick={serachhender} ></input>
            </Col>
          </Row>
        </div>
      </Container>
      <div className='main bgcolor'>
        <Container>
          <Row>
            {
              val.map((ele, ind) => {
                return (
                  <>
                    <Col lg={6} >
                      <div className='box d-flex'>
                        <div className='box-img'>
                          <img src={ele.image}></img>
                        </div>
                        <div className='info'>
                          <div className='name'>
                            <h4>{ele.name}</h4>
                            <span className='status d-flex align-items-center'>
                              <span className='status-activ' style={{ backgroundColor: ele.status == "Alive" ? "green" : ele.status == "Dead" ? "red" : "gray" }}></span>
                              <div>{ele.status}-{ele.species}</div>
                            </span>
                          </div>
                          <div className='name'>
                            <p>Last known location:</p>
                            <div>{ele.location.name}</div>
                          </div>
                          <div className='name'>
                            <p>First seen in:</p>
                            <div>{ele.origin.name}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </>
                )
              })
            }
          </Row>
        </Container>
      </div>
    </div >
    }

    </>
  );
}

export default App;