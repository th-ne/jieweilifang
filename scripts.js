// 颜色选择器功能
document.addEventListener('DOMContentLoaded', function() {
    const colorOptions = document.querySelectorAll('.color-option');
    const productImage = document.getElementById('product-main-image');
    const colorName = document.getElementById('color-name');
    
    const colorNames = {
        'black': '黑色',
        'clear': '透明色',
        'orange': '橘色',
        'cyan': '青色',
        'white': '白色',
        'green': '绿色',
       
        
    };
    
    // ========== 新增：预加载所有颜色图片 ==========
    colorOptions.forEach(option => {
        const imgUrl = option.getAttribute('data-image');
        const preloadImg = new Image(); // 创建隐藏的图片对象
        preloadImg.src = imgUrl; // 提前加载图片到浏览器缓存
    });
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有active类
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // 添加active类到当前选项
            this.classList.add('active');
            
            // 更新产品图片
            const imageUrl = this.getAttribute('data-image');
            productImage.src = imageUrl;
            
            // 更新颜色名称
            const color = this.getAttribute('data-color');
            colorName.textContent = colorNames[color];
            
            // 淡入淡出动画
            productImage.style.opacity = '0';
            setTimeout(() => {
                productImage.style.opacity = '1';
            }, 100);
        });
    });
    
    // 配置选项功能
    const configOptions = document.querySelectorAll('.config-option');
    configOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除同组所有active类
            const parent = this.parentElement;
            parent.querySelectorAll('.config-option').forEach(opt => opt.classList.remove('active'));
            // 添加active类到当前选项
            this.classList.add('active');
        });
    });
    
    // 轮播图功能
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let slideInterval;
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 处理循环
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        // 显示当前幻灯片
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // 下一张幻灯片
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // 开始自动轮播
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // 5秒切换一次
    }
    
    // 停止自动轮播
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // 事件监听
    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });
    
    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });
    
    // 鼠标悬停时停止轮播
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopSlideShow);
    carouselContainer.addEventListener('mouseleave', startSlideShow);
    
    // 开始自动轮播
    startSlideShow();
    
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('section > div > div:not(.fade-in)').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    });
});