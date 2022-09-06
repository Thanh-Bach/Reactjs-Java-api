import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CategoryServices from "../../../services/category.service.js"
import PrdServices from "../../../services/product.service"
import PopularCat from "./PopularCat"
import Deal from "./Deal"
import AllPrd from "./AllPrd"
import Watchhl from "./watchhl"
import Watchfm from "./watchfm"

class Content extends React.Component {
  constructor(props){
    super(props)
    this.state ={
        category:[]
    }
}
    componentDidMount(){
       PrdServices.getPrd().then((res) => {
      this.setState({ products: res.data });
    });
      
      CategoryServices.getCat().then((Response)=>{
            this.setState({category:Response.data});
        })
    }
    render() {
        return ( 
<>
<div className="container">
        {/* ========================= SECTION MAIN  ========================= */}
        <section className="section-main">
          <main className="card">
            <div className="card-body">
              <div className="row">
                <aside className="col-lg col-md-3 flex-lg-grow-0">
                  <nav className="nav-home-aside">
                    <h6 className="title-category">Danh Mục <i className="d-md-none icon fa fa-chevron-down" /></h6>
                    <ul className="menu-category">
                    {
                                        this.state.category.map(
                                          category => 
                                          <li><Link to={`/products/${category.categoryslug}`}>
                                            <tr key = {category.id}>
                                                <td> { category.categoryname} </td>                                                  
                                                
                                            </tr>
                                            </Link></li>
                                        )
                    }
                    </ul>
                  </nav>
                </aside> {/* col.// */}
                <div className="col-md-9 col-xl-7 col-lg-7">
                  {/* ================== COMPONENT SLIDER  BOOTSTRAP  ==================  */}
                  <div id="carousel1_indicator" className="slider-home-banner carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carousel1_indicator" data-slide-to={0} className="active" />
                      <li data-target="#carousel1_indicator" data-slide-to={1} />
                      <li data-target="#carousel1_indicator" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src="assets/images/banners/bia1.jpg" alt="First slide" /> 
                      </div>
                      <div className="carousel-item">
                        <img src="assets/images/banners/bia2.png" alt="Second slide" />
                      </div>
                      <div className="carousel-item">
                        <img src="assets/images/banners/bia3.jpg" alt="Third slide" />
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#carousel1_indicator" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel1_indicator" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="sr-only">Next</span>
                    </a>
                  </div> 
                  {/* ==================  COMPONENT SLIDER BOOTSTRAP end.// ==================  .// */}	
                </div> {/* col.// */}
                <div className="col-md d-none d-lg-block flex-grow-1">
                  <aside className="special-home-right">
                    <h6 className="bg-blue text-center text-white mb-0 p-2">Danh Mục Phổ Biến</h6>
                    {/* <div className="card-banner border-bottom">
                      <div className="py-3" style={{width: '80%'}}>
                        <h6 className="card-title">Men clothing</h6>
                        <a href="#" className="btn btn-secondary btn-sm"> Source now </a>
                      </div> 
                      <img src="assets/images/items/1.jpg" height={80} className="img-bg" />
                    </div> */}
                    <PopularCat/>
                  </aside>
                </div> {/* col.// */}
              </div> {/* row.// */}
            </div> {/* card-body.// */}
          </main> {/* card.// */}
        </section>
        {/* ========================= SECTION MAIN END// ========================= */}
        {/* =============== SECTION DEAL =============== */}
        <section className="padding-bottom">
          <div className="card card-deal">
            <div className="col-heading content-body">
              <header className="section-heading">
                <h3 className="section-title">Ưu đãi</h3>
              </header>{/* sect-heading */}
              <div className="timer">
                <div> <span className="num">04</span> <small>Ngày</small></div>
                <div> <span className="num">12</span> <small>Giờ</small></div>
                <div> <span className="num">58</span> <small>Phút</small></div>
                <div> <span className="num">02</span> <small>Giây</small></div>
              </div>
            </div> {/* col.// */}
            <div className="row no-gutters items-wrap">
             <Deal/>
            </div>
          </div>
        </section>
        {/* =============== SECTION DEAL // END =============== */}
        {/* =============== SECTION 1 =============== */}
        <section className="padding-bottom">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Đồng Hồ Hublot</h4>
          </header>
          <div className=" card-home-category">
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="home-category-banner bg-light-orange">
                 
                  <p>Hublot là thương hiệu đồng hồ hạng sang đến từ Thụy Sỹ, bất kỳ ai muốn sở hữu đều phải bỏ ra một số tiền rất lớn, thậm chí có nhiều mẫu lên đến hàng chục tỷ đồng.</p>
                  <img src="assets/images/banners/hublot.png" className="img-bg" width={300} height={400} />
                </div>
              </div> {/* col.// */}
              <div className="col-md-9">
                <ul className="row no-gutters bordered-cols">
                <Watchhl/>
                </ul>
              </div> {/* col.// */}
            </div> {/* row.// */}
          </div> {/* card.// */}
        </section>
        {/* =============== SECTION 1 END =============== */}
        {/* =============== SECTION 2 =============== */}
        <section className="padding-bottom">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Đồng Hồ Franck Muller</h4>
          </header>
          <div className=" card-home-category">
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="home-category-banner bg-light-orange">
                 
                  <p>Thương hiệu đồng hồ Franck Muller đến từ Thụy Sĩ được mệnh danh là “Bậc thầy của những cỗ máy phức tạp”. Nhà sản xuất Franck Muller đem đến những chiếc đồng hồ sáng tạo với chất lượng cao nhất. Nhiều sáng tạo của hãng có các tính năng phức tạp hoàn toàn mới trong ngành công nghiệp đồng hồ. Chiếc đồng hồ đeo tay phức tạp nhất thế giới mang tên “Aeternitas Mega”, là đỉnh cao của sự thành công trong chế tác đồng hồ cũng là niềm tự hào của thương hiệu Franck Muller.</p>
                  <img src="assets/images/banners/fm.jpg" className="img-bg" />
                </div>
              </div> {/* col.// */}
              <div className="col-md-9">
                <ul className="row no-gutters bordered-cols">
                <Watchfm/>
                </ul>
              </div> {/* col.// */}
            </div> {/* row.// */}
          </div> {/* card.// */}
        </section>
        {/* =============== SECTION 2 END =============== */}
        {/* =============== SECTION ITEMS =============== */}
        <section className="padding-bottom-sm">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Sản Phẩm Của Chúng Tôi</h4>
          </header>
          <div className="row row-sm">
           <AllPrd/>
           
          </div> {/* row.// */}
        </section>
        {/* =============== SECTION ITEMS .//END =============== */}
        {/* =============== SECTION SERVICES =============== */}
        <section className="padding-bottom">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">DỊCH VỤ THƯƠNG MẠI</h4>
          </header>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <article className="card card-post">
                <img src="assets/images/posts/1.jpg" className="card-img-top" />
                <div className="card-body">
                  <h6 className="title">Đảm bảo thương mại</h6>
                  <p className="small text-uppercase text-muted">BẢO VỆ TRẬT TỰ</p>
                </div>
              </article> {/* card.// */}
            </div> {/* col.// */}
            <div className="col-md-3 col-sm-6">
              <article className="card card-post">
                <img src="assets/images/posts/2.jpg" className="card-img-top" />
                <div className="card-body">
                  <h6 className="title">Thanh toán bất cứ lúc nào</h6>
                  <p className="small text-uppercase text-muted">GIẢI PHÁP TÀI CHÍNH</p>
                </div>
              </article> {/* card.// */}
            </div> {/* col.// */}
            <div className="col-md-3 col-sm-6">
              <article className="card card-post">
                <img src="assets/images/posts/3.jpg" className="card-img-top" />
                <div className="card-body">
                  <h6 className="title">Giải pháp kiểm tra</h6>
                  <p className="small text-uppercase text-muted">KIỂM TRA DỄ DÀNG</p>
                </div>
              </article> {/* card.// */}
            </div> {/* col.// */}
            <div className="col-md-3 col-sm-6">
              <article className="card card-post">
                <img src="assets/images/posts/4.jpg" className="card-img-top" />
                <div className="card-body">
                  <h6 className="title">Vận chuyển đường biển và hàng không</h6>
                  <p className="small text-uppercase text-muted">DỊCH VỤ HẬU CẦN</p>
                </div>
              </article> {/* card.// */}
            </div> {/* col.// */}
          </div> {/* row.// */}
        </section>
        {/* =============== SECTION SERVICES .//END =============== */}
        {/* =============== SECTION REGION =============== */}
        <section className="padding-bottom">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">CHỌN VÙNG</h4>
          </header>
          <ul className="row mt-4">
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/CN.png" /> <span>China</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/DE.png" /> <span>Germany</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/AU.png" /> <span>Australia</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/RU.png" /> <span>Russia</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/IN.png" /> <span>India</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/GB.png" /> <span>England</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/TR.png" /> <span>Turkey</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src="assets/images/icons/flags/UZ.png" /> <span>Uzbekistan</span> </a></li>
            <li className="col-md col-6"><a href="#" className="icontext"> <i className="mr-3 fa fa-ellipsis-h" /> <span>Nhiều vùng hơn
</span> </a></li>
          </ul>
        </section>
        {/* =============== SECTION REGION .//END =============== */}
        <article className="my-4">
          <img src="assets/images/banners/ad-sm.png" className="w-100" />
        </article>
      </div>  
      {/* container end.// */}
</>
        )
    }
}
export default Content
