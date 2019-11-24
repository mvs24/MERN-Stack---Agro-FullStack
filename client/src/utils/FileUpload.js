import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import Spinner from '../components/Spinner/Spinner'

// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
// import CircularProgress from '@material-ui/core/CircularProgress'

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false,
    finished: false
  };

  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data"
      }
    };
    formData.append("file", files[0]);
    axios.post('/api/uploadFile', formData, config)
      .then(res => {
        this.setState({
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, res.data]
        }, () => {
          this.props.imagesHandler(this.state.uploadedFiles)
        })
      })
  };

  onRemove = id => {
    axios.get(`/api/removeFile?public_id=${id}`)
      .then(res => {
        let newImages = this.state.uploadedFiles.filter(el => el.public_id !== id);
        this.setState({
          uploadedFiles: newImages
        }, () => {
          this.props.imagesHandler(newImages)
        })
      })
  }

  showUploadedImages = () => (
    this.state.uploadedFiles.map(el => (
      <div
      onClick={() => this.onRemove(el.public_id)}
      key={el.public_id}>
        <div style={{height: '10rem', width: '10rem'}}>
          <img style={{width: '100%', marginRight: '0.2rem', height: '100%'}} src={el.url} alt=""/>
        </div>
      </div>
    ))

  )
  

  render() {
    return (
      <div>
        <Dropzone
          multiple={false}
          onDrop={acceptedFiles => this.onDrop(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={{margin: '1rem' , cursor: 'pointer' }}>Click here to add an image for your product</p>
              </div>
            </section>
          )}
        </Dropzone>
        {this.showUploadedImages()}
        {this.state.uploading && <Spinner/>}
      </div>
    );
  }
}

export default FileUpload;
