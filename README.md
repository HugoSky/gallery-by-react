# gallery-by-react
Photo gallery project based on react
这是学习慕课网Materliu的视频课程做出的一个小项目。
在nodejs下使用reactjs和webpack构建。
画廊组件构成为：
  AppComponent
      ——ImgFigure
      ——ControllerUnit
  其中，AppComponent充当ImgFigure和ControllerUnit的容器，子组件的状态初始化和事件响应函数都在AppComponent中经过初始化，并作为参数传递给两个子组件，子组件发生点击事件后，调用作为props传递下来的父组件的函数，修改组件状态，之后数据回流，子组件重新渲染。

以下是各个组件中的构成及分析：
  AppComponent：
      --Constant对象：
        画廊分为四个图片放置区域，中间区域（1张），页面上方区域（0张或一张），左右区域（平均分布剩余图片），Constant对象存储的就是各个区域图片可以放置的图片位置范围，在渲染图片组件时，根据存储的范围随机生成图片的放置位置。
      --inverse方法：
        传入参数为图片的index，这里使用了一个闭包函数，返回一个函数。函数中会将图片反转状态取反，之后调用this.setState函数改变组件状态。
      --center方法：
        传入参数为图片的index。也是使用闭包，返回一个函数，调用rearrange方法，传入index参数，rearrange接收的参数为放置在中心区域的图片index。
      --rearrange方法：
        传入参数为中心区域的图片index，在这个方法中，会生成存有所有图片位置信息的数组，将数组存入AppComponent组件的state中，这样，当state发生改变时，就会重新渲染组件。
      --componentDidMount方法：
        这是React组件自带方法，在组件加载完成后，会自动调用，所以我们在这里获取页面信息，之后计算Constant中的区域范围，调用rearrange方法，改变每张图片的位置信息。
      --render方法：
        这里首先声明了两个数组，分别初始化两个子组件列表和imgsArrangeArr数组，imgsArrangeArr按照下标对应存放了每张图片的位置信息，之后依靠改变imgsArrangeArr中的位置信息来改写组件的state，实现重新渲染。
        <ImgFigure data={value} key={index} arrange={this.state.imgsArrangeArr[index]} ref={'imgFigure' + index} center={this.center(index)} inverse={this.inverse(index)}
        这里将center方法和inverse方法都传递给了子组件，子组件可以调用两个方法使得AppComponent中的state改变。
  ImgFigure：
      --handleClick方法：
        响应每张图片的点击事件，调用center和inverse方法。
  ControllerUnit：
      --handleClick方法：
        响应每个按钮的点击事件，调用center和inverse方法。


