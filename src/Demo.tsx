import React, { useState } from "react";
import Cropper from "react-cropper";
import 'antd/dist/antd.min.css';
import "cropperjs/dist/cropper.css";
import SAR from "./SAR.png"
import "./Demo.css";
import { Row, Col, Card, Button} from 'antd';

const defaultSrc =SAR;

export const Demo: React.FC = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const test = () => {
    console.log();
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={4}>
          <Card title="Console" bordered={true} >
            <Button onClick={test} type="primary">导入图像/选择文件</Button>
            <br></br>
            <br></br>
            <input type="file" onChange={onChange} />
            <br></br>
            <br></br>
            <Button type="primary">使用默认图像</Button>
            <br></br>
            <br></br>
            <Button type="primary" onClick={getCropData}>Crop Image</Button>
          </Card>
        </Col>
        <Col span={20}>
          <Card title="Image">
            <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
          <br></br>
          <br></br>
          <a>Preview</a>
          <a style={{float:"right"}}>Cropped Img</a>
          <br></br>
          <div
            className="img-preview"
            style={{ width: "50%", float: "left", height: "500px" }}
          />
         
          <img style={{ width: "50%",float: "right",height:"50%" }} src={cropData} alt="cropped" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Demo;
