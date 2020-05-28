import React, { Component } from "react";
import * as firebase from 'firebase';
import firebaseConfig from "../../firebase/firebase";
export default class Product extends Component {
    constructor(props){
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp((firebaseConfig));
        }

        this.state = {
            productList: []
        }
    }

    ambilDataDariServerAPI = () => {                // fungsi untuk mengambil data dari API dengan penambahan sort dan order
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);   
        })
    }

    simpanDataKeServerAPI = () => {
        firebase.database().ref("/").set(this.state);
    }

    componentDidMount() {       // komponen untuk mengecek ketika compnent telah di-mount-ing, maka panggil API
        this.ambilDataDariServerAPI()  // ambil data dari server API lokal
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState !== this.state){
            this.simpanDataKeServerAPI();
        }
    }

    handleTombolSimpan = (event) => {         
        let brand = this.refs.productBrand.value;   // fungsi untuk meng-handle tombol simpan
        let name = this.refs.productName.value;
        let image = this.refs.productImage.value;
        let price = this.refs.productPrice.value;
        let spec = this.refs.productSpec.value;
        let uid = this.refs.uid.value;

        if (uid && brand && name && image && price && spec){                  // Cek apakah semuad data memiliki nilai (tidak null)
            const {productList} = this.state;
            const productIndex = productList.findIndex(data => {
                return data.uid === uid;
            })
            productList[productIndex].brand = brand;
            productList[productIndex].name = name;
            productList[productIndex].image = image;
            productList[productIndex].price = price;
            productList[productIndex].spec = spec;
            this.setState({productList});
        } else if (brand && name && image && price && spec){                  // Cek jika apakah tidak ada data di server
            const uid = new Date().getTime().toString();
            const {productList} = this.state;
            productList.push({ uid, brand, name, image, price, spec});
            this.setState({productList});
        }

        this.refs.productBrand.value = "";
        this.refs.productName.value = "";
        this.refs.productImage.value = "";
        this.refs.productPrice.value = "";
        this.refs.productSpec.value = "";
        this.refs.uid.value = "";
    }

    render() {
        return(
            <div className="post-artikel card p-4" >
                <div className="form">
                    <div className="form-group row">
                        <div className="col-sm">
                            <input placeholder="Brand" type="text" className="form-control" id="brand" name="brand" ref="productBrand" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm">
                            <input placeholder="Name" type="text" className="form-control" id="name" name="name" ref="productName" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm">
                            <input placeholder="Image Link" type="text" className="form-control" id="image" name="image" ref="productImage" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm">
                            <input placeholder="Price" type="text" className="form-control" id="price" name="price" ref="productPrice" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm">
                            <input placeholder="Specification Link" type="text" className="form-control" id="spec" name="price" ref="productSpec" />
                        </div>
                    </div>
                    <input type="hidden" name="uid" ref="uid"/>
                    <button type="submit" className="btn btn-primary col-sm" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
            </div>
        )
    }
}
