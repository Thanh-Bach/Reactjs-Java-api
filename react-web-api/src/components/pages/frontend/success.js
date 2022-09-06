import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'

class success extends React.Component {

    render() {
        return (
            <> <Header />
                <section className="section-pagetop bg-light">
                    <div className="container">
                        <h2 className="title-page" style={{textAlign: 'center'}}>Cảm Ơn Bạn Đã Đặt Hàng</h2>
                    </div> {/* container .// */}
                </section>
                <Footer /></>

        );
    }
}
export default success