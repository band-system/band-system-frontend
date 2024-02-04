
import { useParams} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from "react";
import './profile.css'

const ProfilePublic = ({url}) => {
    const {id} = useParams();
    console.log(id);
    const [info, setInfo] = useState(null);
    const [errMsg, setErrMsg] = useState('1234');
    const [name, setName] = useState(null);
    const [prefered_time, setPrefered_time] = useState(null);
    const [instrument, setInstrument] = useState(null);
    const [style, setStyle] = useState(null);
    const [region, setRegion] = useState(null);
    const [ig, setIg] = useState(null);
    const [fb, setFb] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [email, setEmail] = useState(null);
    const [bio, setBio] = useState(null);

    useEffect(()=>{
        if(info){
            console.log(info.photo);
            fetchPhoto(info.photo);
        }
        else {
            console.log("cannot fetch info");
        }
    },[info])

    useEffect(() => {
        loadInitialPage();
    },[]);

    const loadInitialPage = async () => {
        console.log("init");
        const response = await fetch(url + 'user?user_id=' + id, {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setInfo(data);
        console.log(info);

    }
    

    const fetchPhoto = async(filename) => {
        
        if(filename == "")
        {
            console.log("fetch")
            filename = "default.jpg"

        }
        
        const res = await fetch(url + 'image/' + filename ,{
            // mode: "no-cors",
            method: 'GET',
        });
        console.log(res.status)
        const imageBlob = await res.blob();
        const photoURL = URL.createObjectURL(imageBlob);
        console.log(photoURL)
        setPhoto(photoURL);
        console.log(photo)
        
    }

    const styles = ['J-rock', 'Metal', 'J-pop', 'Lo-Fi', 'Jazz', 'Post Rock', 'Math Rock', 'Acoustic', 'Softcore', 'Pop-Punk', 'Country', "Others"];
    const regions = {
        "KLU": "基隆市",
        "TPH": "新北市", 
        "TPE": "臺北市", 
        "TYC": "桃園市", 
        "HSH": "新竹縣", 
        "HSC": "新竹市", 
        "MAL": "苗栗縣", 
        "TXG": "臺中市", 
        "CWH": "彰化縣",
        "NTO": "南投縣",
        "YLH": "雲林縣", 
        "CHY": "嘉義縣", 
        "CYI": "嘉義市", 
        "TNN": "臺南市", 
        "KHH": "高雄市", 
        "IUH": "屏東縣", 
        "ILN": "宜蘭縣",
        "HWA": "花蓮縣",
        "TTT": "臺東縣", 
        "PEH": "澎湖縣", 
        "GNI": "綠島", 
        "KYD": "蘭嶼", 
        "KMN": "金門縣", 
        "LNN": "連江縣"
    };
    const Instruments = ["Electric Guitar", "KB", "Drums", "Bass", "Vocal", "Saxophone", "Cello", "Acoustic Guitar", "Trumpet", "Others"];


    if(!info || !photo) return "loading";
    console.log(info.region)
    return(
        <div className="container emp-profile">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={photo} alt="profile"/>
                            {/* <!-- <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div> --> */}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        {info.name}
                                    </h5>

                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                {/* <!-- <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li> --> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p>CONTACT</p>
                            <div className="mt-3">
                                <div className="d-inline p-2"><a href={"https://instagram.com/" + info.ig} ><FontAwesomeIcon icon={faInstagram} size="2x" /></a></div>
                                <div className="d-inline p-2">{info.ig}</div>
                                <br/>
                            </div>

                            <div className="mt-3">
                                <div className="d-inline p-2"><a href={"https://facebook.com/" + info.fb}><FontAwesomeIcon icon={faFacebook} size="2x" /></a></div>
                                <div className="d-inline p-2">{info.fb}</div>
                                <br/>
                            </div>
                            
                            <div className="mt-3">
                                <a href="" className="d-inline p-2"><FontAwesomeIcon icon={faEnvelope} size="2x"/></a>
                                <div className="d-inline p-2">{info.email}</div>
                            </div>
                            
                            

                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label className="mt-1">User Id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p className="mt-1">{id}</p>
                                            </div>
                                        </div>
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label className="mt-1">Music Style</label>
                                            </div>
                                            <div class="col-md-6">
                                                {info.style?.map((i, index) => (
                                                        <p  className="mt-1" key={index}>{styles[i]}</p>
                                                ))}
                                                {/* <p className="mt-1">{info.style}</p> */}
                                            </div>
                                        </div>
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label className="mt-1 mb-2">Region</label>
                                            </div>
                                            <div class="col-md-6 mt-1 rounded">
                                                {info.region.map((i, index) => (
                                                    <p className="mt-1" key={index}>{regions[i]}</p>
                                                ))}
                                                {/* <p>{info.region}</p> */}
                                            </div>
                                        </div>
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label  className="mt-1">Instrument</label>
                                            </div>
                                            <div class="col-md-6">
                                                {info.instrument?.map((i, index) => (
                                                    <p  className="mt-1" key={index}>{Instruments[i]}</p>
                                                ))}
                                                {/* <p>{info.instrument}</p> */}
                                            </div>
                                        </div>
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label  className="mt-1">Prefered Time</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p  className="mt-1">{info.prefered_time}</p>
                                            </div>
                                        </div>
                                    <div class="row border mt-1 rounded">
                                        <div class="col-md-12">
                                            <label className="mt-1">Your Bio</label><br/>
                                            <p className="mt-1">{info.bio}</p>
                                        </div>
                                    </div>
                            </div>
                            
                        </div>
                    </div>
                </div>           
        </div>

    ); 
}
 
export default ProfilePublic;