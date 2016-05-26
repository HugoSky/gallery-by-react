require('normalize.css/normalize.css');
require('styles/App.scss');

var imageDatas = require('../data/imageDatas.json');

import React from 'react';

//处理图片数据  将图片名信息 转成图片url信息
imageDatas = (function getImageURL(imageDataArr){
  for(var i = 0;i < imageDataArr.length;i++){
    var singleData = imageDataArr[i];
    singleData.imageURL = require('../images/'+singleData.fileName);
    imageDataArr[i] = singleData;
  }
  return imageDataArr;
})(imageDatas);


class AppComponent extends React.Component {
  render() {
    return (
      <section className = "stage">
        <section className = "img-sec">

        </section>
        <nav className = "controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
