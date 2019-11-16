import React, { Component } from "react";

import Dropzone from "react-dropzone";
import axios from "axios";

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
        'content-type': 'multipart/form-data'
      }
    };
    formData.append('file', files[0]);
    axios.post('/api/product/uploadImage', formData, config)
      .then(res => {
        console.log(res.data);
        this.setState({
          uploading: false,
          finished: true,
          uploadedFiles: [...this.state.uploadedFiles, res.data]
        }, () => {
          this.props.imagesHandler(this.state.uploadedFiles)
        })
      })
  }

  render() {
    return (
      <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Add an image for your product</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default FileUpload;