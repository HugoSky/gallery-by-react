require('normalize.css/normalize.css');
require('styles/App.scss');
var React = require('react');
var ReactDOM = require('react-dom');

// 获取图片相关的数据
//json-loader 用法改变
var imageDatas = require('../data/imageDatas.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDatasArr) {

    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);

function getRangeRandom(low,high){
  return Math.ceil(Math.random() * (high - low) + low);
}

//获取0到30之间的任意正负值
function get30DegRandom(){
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random()*30));
}

var ImgFigure = React.createClass({
  handleClick : function(e){
    if(this.props.arrange.isCenter){
       this.props.inverse();
    }else{
       this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  },
  render : function(){
    var styleObj = {};
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }

    if(this.props.arrange.isCenter){
      styleObj.zIndex = 11;
    }

    var imgFigureClassName = "img-figure";
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    return(
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} title={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
})

var AppComponent = React.createClass({
  Constant : {
    centerPos : {
      left : 0,
      right : 0
    },
    hPosRange : {  //左右两侧取值范围
      leftSecX : [0,0],
      rightSecX : [0,0],
      y : [0,0]
    },
    vPosRange : {   //上方区域取值范围
      x : [0,0],
      topY : [0,0]
    }
  },

  /*
  *反转图片
  *@param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
  *@return {Function} 这是一个闭包函数  其内return一个真正待被执行函数
  */
  inverse : function(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr : imgsArrangeArr
      });
    }.bind(this);
  },
  center : function(index){
    return function(){
     this.rearrange(index);
    }.bind(this);
  },
  /*
  *重新布局所有图片  指定居中排布
  @param imgIndex  指定剧中排布哪张图片
  *imgsArrangeArr 所有图片位置信息数组
  */
  rearrange : function(centerImgIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random() * 2),  //随机生成上册区域图片数量 0或1
        topImgSpliceIndex = 0;

        //取出居中图片
        var imgsArrangeCenterArr = imgsArrangeArr.splice(centerImgIndex,1);
        //修改居中图片位置  不需要旋转
        imgsArrangeCenterArr[0] = {
          pos : centerPos,
          rotate : 0,
          isCenter : true
        }

        //在所有图片数组中随机生成一个位置，在这个位置上取出上测要放置的图片
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        imgsArrangeTopArr.forEach(function(value,index){
            imgsArrangeTopArr[index] = {
              pos : {
                top : getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left : getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate : get30DegRandom(),
              isCenter : false
            }
        });


        for(var i = 0,j = imgsArrangeArr.length,k = j/2;i < j;i++){
          var xRange = null;
          //前半部分图片赋予一个左侧区域图片取值范围
          //后半部分图片赋予一个右侧区域图片取值范围
          //根据这个范围生成随机的图片位置
          if(i < k){
            xRange = hPosRangeLeftSecX;
          }else{
            xRange = hPosRangeRightSecX;
          }
          imgsArrangeArr[i] ={
            pos : {
              top : getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
              left : getRangeRandom(xRange[0], xRange[1])
            },
            rotate : get30DegRandom(),
            isCenter : false
          }
        }
        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerImgIndex,0,imgsArrangeCenterArr[0]);
        this.setState({
          imgsArrangeArr : imgsArrangeArr
        })
  },
  getInitialState : function(){
    return {
      imgsArrangeArr : [
        /*{
          pos : {
            left : '0',
            top : '0'
          },
          rotate : 0,
          inInverse : false,
          isCenter : false
        }*/
      ]
    };
  },
  //组件加载之后 计算区域数值范围
  //分 上中左右四个部分  各个角落规定可超出屏幕范围为图片的四分之一
  componentDidMount : function(){
    //拿到舞台的大小
    var stageDOM = this.refs.stage,
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    //拿到一个imageFifure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    //第一张居中
    this.rearrange(0);
  },
  render : function() {
    var controllerUnits = [],
        imgFigures = [];
    imageDatas.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos : {
            left : 0,
            top : 0
          },
          rotate : 0,
          inInverse : false,
          isCenter : false
        }
      }
      imgFigures.push(<ImgFigure data={value} key={index} arrange={this.state.imgsArrangeArr[index]} ref={'imgFigure' + index} center={this.center(index)} inverse={this.inverse(index)}/>);
    }.bind(this));
    return (
      <section className = "stage" ref="stage">
        <section className = "img-sec">
          {imgFigures}
        </section>
        <nav className = "controller-nav">
        </nav>
      </section>
    );
  }
})

AppComponent.defaultProps = {
};

export default AppComponent;
