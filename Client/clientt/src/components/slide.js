import React from 'react';

const Slideshow = () => {
    const images = [
        { src: 'Room1.jpg', alt: 'Slide 1' },
        { src: 'Room2.jpg', alt: 'Slide 2' },
        { src: 'Room3.jpg', alt: 'Slide 3' },
        { src: 'Room4.jpg', alt: 'Slide 4' },
        { src: 'Room5.jpg', alt: 'Slide 5' },
    ];

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators */}
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        type="button"
                        key={index}
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img
                            src={`/Image/${image.src}`}
                            className="d-block img-fluid"
                            alt={image.alt}
                            style={{
                                width: '100%',
                                height: '400px', // Điều chỉnh chiều cao tùy ý
                                objectFit: 'cover', // Duy trì tỷ lệ hình ảnh
                                borderRadius: '8px', // Bo góc nếu cần
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Slideshow;
