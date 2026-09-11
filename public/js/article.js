/**
 * 文章详情页面JavaScript功能
 * 
 * 主要功能：
 * 1. 根据URL参数加载对应文章
 * 2. 处理相关产品链接
 * 3. 文章分享功能
 * 4. 评论功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化变量
    let articleId = null;
    
    // 模拟文章数据
    // 实际项目中应该从JSON文件或API获取
    const articlesData = [
        {
            id: '001',
            title: 'iPhone 16 Pro性能测试：A18 Pro芯片提升幅度惊人',
            content: document.getElementById('article-body').innerHTML, // 使用当前页面的内容作为默认内容
            category: 'news',
            date: '2024-10-15',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/article-detail.jpg',
            imageCaption: 'iPhone 16 Pro展示了强大的A18 Pro芯片性能',
            tags: ['iPhone 16 Pro', 'A18 Pro', '性能测试', '苹果芯片'],
            relatedProducts: [
                {
                    id: 'iphone-16-pro',
                    name: 'iPhone 16 Pro',
                    image: '../public/images/products/iphone16pro.jpg'
                },
                {
                    id: 'iphone-16-pro-max',
                    name: 'iPhone 16 Pro Max',
                    image: '../public/images/products/iphone16promax.jpg'
                },
                {
                    id: 'iphone-15-pro',
                    name: 'iPhone 15 Pro',
                    image: '../public/images/products/iphone15pro.jpg'
                }
            ],
            relatedArticles: [
                {
                    id: '007',
                    title: 'iPhone 16系列摄像头全面评测：Ultra新增变焦功能',
                    date: '2024-10-12',
                    image: '../public/images/news/related1.jpg'
                },
                {
                    id: '008',
                    title: 'iOS 18.1新功能详解：Apple Intelligence体验报告',
                    date: '2024-10-08',
                    image: '../public/images/news/related2.jpg'
                },
                {
                    id: '009',
                    title: 'M4芯片跑分曝光：性能提升超预期，Mac产品线或将全面更新',
                    date: '2024-10-03',
                    image: '../public/images/news/related3.jpg'
                }
            ],
            comments: [
                {
                    author: '王小明',
                    date: '2024-10-15 15:30',
                    content: '文章写得很详细，对于A18 Pro芯片的性能分析非常专业。我特别关注GPU性能的提升，因为我经常用iPhone玩游戏，25%的提升确实很可观。',
                    likes: 12,
                    avatar: '../public/images/user-avatar1.jpg'
                },
                {
                    author: '李晓华',
                    date: '2024-10-15 16:45',
                    content: '能否再详细说明一下A18 Pro在AI方面的具体应用场景？特别是与安卓旗舰机型相比，苹果的AI处理有什么优势？',
                    likes: 8,
                    avatar: '../public/images/user-avatar2.jpg'
                },
                {
                    author: '张科技',
                    date: '2024-10-15 18:20',
                    content: '温度控制这部分很有价值，之前用iPhone 15 Pro玩游戏时确实会感到明显发热。如果16 Pro真的能把温度降低2-3度，体验会好很多。另外，电池续航在游戏时提升15%也是个好消息。',
                    likes: 15,
                    avatar: '../public/images/user-avatar3.jpg'
                }
            ]
        },
        {
            id: '002',
            title: 'iPad Air M4 vs M3：是否值得升级？',
            content: '<p>2026 年 3 月，苹果将 iPad Air 升级到 M4 芯片。新款 Air 11 英寸搭载 M4（3 性能核 + 5 能效核 + 9 核 GPU），内存也从上代的 8GB 提升到 12GB，电池保持 28.93Wh，官方续航仍为无线局域网 10 小时。</p><p>对比上一代 M3（4 性能核 + 4 能效核 + 9 核 GPU，8GB 内存），M4 的变化在于 CPU 架构更新与内存翻倍，常驻后台应用和分屏体验会有可感知的提升。如果你手持 M3 版且主要用于笔记、阅读和轻度创作，没有必须换机的理由；从 M1 或更早机型过来，M4 版是更稳妥的选择。</p><p>两代屏幕、刷新率（60Hz）、Apple Pencil Pro 支持完全一致，选购时优先看存储容量与价格即可。</p>',
            category: 'comparisons',
            date: '2024-10-10',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/article1.jpg',
            imageCaption: 'iPad Air M4 与 M3 主要差异在芯片与内存',
            tags: ['iPad Air', 'M4', 'M3', '选购指南'],
            relatedProducts: [
                { id: 'ipad-ipad-air-11-inchm4', name: 'iPad Air 11 英寸(M4)', image: '../public/images/products/ipad-ipad-air-11-inchm4.png' },
                { id: 'ipad-ipad-air-11-inchm3', name: 'iPad Air 11 英寸(M3)', image: '../public/images/products/ipad-ipad-air-11-inchm3.png' }
            ],
            relatedArticles: [
                { id: '001', title: 'iPhone 16 Pro性能测试：A18 Pro芯片提升幅度惊人', date: '2024-10-15', image: '../public/images/news/featured-article.jpg' },
                { id: '009', title: 'M4芯片跑分曝光：性能提升超预期，Mac产品线或将全面更新', date: '2024-10-03', image: '../public/images/news/related3.jpg' }
            ],
            comments: [
                { author: '果粉小李', date: '2024-10-11 10:20', content: '刚从 M1 换到 M4，分屏确实流畅很多，内存加大效果明显。', likes: 6, avatar: '../public/images/user-avatar4.jpg' }
            ]
        },
        {
            id: '003',
            title: 'Apple Watch Series 10深度评测：更大的屏幕，更强的续航',
            content: '<p>Apple Watch Series 10 搭载 S10 SiP，屏幕亮度最高 2000 尼特，官方续航为 18 小时。与前代相比，表壳更薄，充电速度也有提升，官方称 30 分钟可充至约 80%。</p><p>健康功能延续血氧、心电图、体温 sensing 与睡眠监测，新增的潮汐 App 与深度计让它更适合水上运动。如果你是 Series 6 及更早用户，屏幕与充电体验的提升值得考虑；Series 8/9 用户则可以等下一代。</p><p>选购建议参考本站参数对比，重点看表壳尺寸、材质与蜂窝版需求。</p>',
            category: 'reviews',
            date: '2024-10-05',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/article2.jpg',
            imageCaption: 'Series 10 更大的显示面积与更薄的表壳',
            tags: ['Apple Watch', 'Series 10', '评测'],
            relatedProducts: [
                { id: 'watch-apple-watch-series-10', name: 'Apple Watch Series 10', image: '../public/images/products/watch-apple-watch-series-10.webp' }
            ],
            relatedArticles: [
                { id: '001', title: 'iPhone 16 Pro性能测试：A18 Pro芯片提升幅度惊人', date: '2024-10-15', image: '../public/images/news/featured-article.jpg' }
            ],
            comments: [
                { author: '跑步达人', date: '2024-10-06 08:15', content: '充电速度提升是真的，早上洗漱的时间就能补不少电。', likes: 4, avatar: '../public/images/user-avatar5.jpg' }
            ]
        },
        {
            id: '004',
            title: '消息称MacBook Pro M4有望年底发布，将搭载M4 Pro和M4 Max芯片',
            content: '<p>据供应链消息，苹果计划推出搭载 M4 Pro 与 M4 Max 芯片的新款 MacBook Pro。按照苹果近年节奏，Pro 系芯片通常在基础版之后约一年更新，传闻与这一节奏吻合。</p><p>需要提醒的是，以上均为传闻，配置与发布时间以苹果官方为准。持币观望的用户可以先参考本站 Mac 对比页，了解现款 M3 Pro/Max 机型的参数与定位。</p>',
            category: 'rumors',
            date: '2024-09-30',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/article3.jpg',
            imageCaption: '传闻汇总，仅供参考',
            tags: ['MacBook Pro', 'M4', '传闻'],
            relatedProducts: [
                { id: 'mac-pro-006', name: 'MacBook Pro (14 英寸, M4, 2024 年)', image: '../public/images/products/mac-pro-006.webp' }
            ],
            relatedArticles: [
                { id: '009', title: 'M4芯片跑分曝光：性能提升超预期，Mac产品线或将全面更新', date: '2024-10-03', image: '../public/images/news/related3.jpg' }
            ],
            comments: []
        },
        {
            id: '005',
            title: 'iOS 18.1正式版新功能详解：Apple Intelligence全面体验',
            content: '<p>iOS 18.1 带来了 Apple Intelligence 的首批功能，包括写作工具、通知摘要、照片清理以及更自然的 Siri。需要注意的是，Apple Intelligence 仅支持 iPhone 15 Pro 及更新机型，旧机型升级后无法使用这些 AI 功能。</p><p>开启方式：升级到 iOS 18.1 后，进入设置，找到 Apple Intelligence 与 Siri，按提示加入候补名单并下载模型。建议在 Wi-Fi 环境下完成下载，模型体积较大。</p><p>使用建议：写作工具目前对中文的支持有限，英文场景体验更好；通知摘要适合信息过载的用户，但重要通知建议逐条确认。</p>',
            category: 'guides',
            date: '2024-09-25',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/article4.jpg',
            imageCaption: 'iOS 18.1 设置 Apple Intelligence 入口',
            tags: ['iOS 18', 'Apple Intelligence', '使用指南'],
            relatedProducts: [
                { id: 'iphone-16e', name: 'iPhone 16e', image: '../public/images/products/iphone-16e.webp' },
                { id: 'iphone-16e', name: 'iPhone 16e', image: '../public/images/products/iphone-16e.webp' }
            ],
            relatedArticles: [
                { id: '008', title: 'iOS 18.1新功能详解：Apple Intelligence体验报告', date: '2024-10-08', image: '../public/images/news/related2.jpg' }
            ],
            comments: [
                { author: '升级先锋', date: '2024-09-26 12:40', content: '按教程开了写作工具，英文邮件确实好用，中文再等等。', likes: 3, avatar: '../public/images/user-avatar4.jpg' }
            ]
        },
        {
            id: '006',
            title: '苹果收购AI初创公司，为Apple Intelligence添加更多功能',
            content: '<p>据报道，苹果收购了一家专注于自然语言处理的 AI 初创公司。分析普遍认为，这笔收购旨在补强 Apple Intelligence 的文本生成与理解能力。</p><p>结合苹果一贯的端侧优先策略，新增能力大概率以端侧小模型形式落地，先覆盖写作、摘要、Siri 理解等场景。高阶功能仍需等待后续系统版本，短期内不必为此专门换机。</p>',
            category: 'news',
            date: '2024-09-20',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/article5.jpg',
            imageCaption: '苹果持续加码端侧 AI',
            tags: ['苹果', 'AI', 'Apple Intelligence'],
            relatedProducts: [],
            relatedArticles: [
                { id: '005', title: 'iOS 18.1正式版新功能详解：Apple Intelligence全面体验', date: '2024-09-25', image: '../public/images/news/article4.jpg' }
            ],
            comments: []
        },
        {
            id: '007',
            title: 'iPhone 16系列摄像头全面评测：Ultra新增变焦功能',
            content: '<p>从参数看，iPhone 16 延续 4800 万像素主摄（f/1.6 光圈）加 1200 万像素超广角（f/2.2 光圈）的组合，主摄支持 2 倍长焦等效裁切。Pro 系列则在此基础上增加独立长焦，远摄能力拉开差距。</p><p>选购建议：如果常拍远景或演出，直接看 Pro 系列；日常记录、扫街与视频，标准版的主摄表现已经足够，差价可以留给存储容量。</p><p>具体各机型摄像头配置差异见本站 iPhone 对比页。</p>',
            category: 'reviews',
            date: '2024-10-12',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/related1.jpg',
            imageCaption: 'iPhone 16 系列影像配置一览',
            tags: ['iPhone 16', '摄像头', '评测'],
            relatedProducts: [
                { id: 'iphone-16-pro', name: 'iPhone 16 Pro', image: '../public/images/products/iphone16pro.jpg' },
                { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', image: '../public/images/products/iphone16promax.jpg' },
                { id: 'iphone-15-pro', name: 'iPhone 15 Pro', image: '../public/images/products/iphone15pro.jpg' }
            ],
            relatedArticles: [
                { id: '001', title: 'iPhone 16 Pro性能测试：A18 Pro芯片提升幅度惊人', date: '2024-10-15', image: '../public/images/news/featured-article.jpg' }
            ],
            comments: [
                { author: '扫街爱好者', date: '2024-10-13 17:05', content: '主摄的 2 倍裁切很实用， Pro 的长焦留给真的需要的人吧。', likes: 5, avatar: '../public/images/user-avatar5.jpg' }
            ]
        },
        {
            id: '008',
            title: 'iOS 18.1新功能详解：Apple Intelligence体验报告',
            content: '<p>Apple Intelligence 的首批能力集中在三件事：帮你写（写作工具）、帮你看（通知摘要与邮件摘要）、帮你找（照片自然语言搜索与清理）。Siri 的理解能力也有提升，口误、自我修正基本能正确处理。</p><p>局限同样明显：需要 iPhone 15 Pro 及更新机型，中文场景能力弱于英文，部分功能仍需排队。结论是值得升级体验，但不值得为此换机——等中文成熟再说。</p><p>想自己动手的可以看本站 iOS 18.1 设置指南。</p>',
            category: 'reviews',
            date: '2024-10-08',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/related2.jpg',
            imageCaption: 'Apple Intelligence 首批功能体验',
            tags: ['iOS 18', 'Apple Intelligence', '体验'],
            relatedProducts: [
                { id: 'iphone-16e', name: 'iPhone 16e', image: '../public/images/products/iphone-16e.webp' }
            ],
            relatedArticles: [
                { id: '005', title: 'iOS 18.1正式版新功能详解：Apple Intelligence全面体验', date: '2024-09-25', image: '../public/images/news/article4.jpg' }
            ],
            comments: []
        },
        {
            id: '009',
            title: 'M4芯片跑分曝光：性能提升超预期，Mac产品线或将全面更新',
            content: '<p>本站收录的跑分数据显示，搭载 M4 的 iPad Pro 11 英寸单核约 3650 分、多核约 13073 分，GPU 约 54066 分，相比 M3 有明显提升，能效表现延续苹果一贯水准。</p><p>随着 M4 在 iPad 上先行落地，Mac 产品线全面换芯只是时间问题。已有机型用户无需着急，M1 至今仍能胜任绝大多数工作；打算换机的可以等新品发布后再比价。</p><p>完整排名见本站跑分榜。</p>',
            category: 'news',
            date: '2024-10-03',
            author: 'Apple Compare 编辑部',
            image: '../public/images/news/related3.jpg',
            imageCaption: 'M4 跑分数据来自本站收录',
            tags: ['M4', '跑分', 'Mac'],
            relatedProducts: [
                { id: 'mac-pro-006', name: 'MacBook Pro (14 英寸, M4, 2024 年)', image: '../public/images/products/mac-pro-006.webp' },
                { id: 'ipad-ipad-air-11-inchm4', name: 'iPad Air 11 英寸(M4)', image: '../public/images/products/ipad-ipad-air-11-inchm4.png' }
            ],
            relatedArticles: [
                { id: '002', title: 'iPad Air M4 vs M3：是否值得升级？', date: '2024-10-10', image: '../public/images/news/article1.jpg' }
            ],
            comments: []
        },
        // 更多文章数据...
    ];
    
    // 初始化页面
    initPage();
    
    /**
     * 初始化页面
     */
    function initPage() {
        // 获取URL参数中的文章ID
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('id')) {
            articleId = urlParams.get('id');
            loadArticle(articleId);
        }
        
        // 绑定事件处理器
        bindEventHandlers();
        
        // 初始化返回顶部按钮
        initBackToTopButton();
    }
    
    /**
     * 加载文章内容
     */
    function loadArticle(id) {
        // 查找对应ID的文章
        const article = articlesData.find(article => article.id === id);
        
        if (!article) {
            // 文章不存在，显示错误信息
            showArticleNotFound();
            return;
        }
        
        // 更新页面标题
        document.title = `${article.title} - Apple Compare`;
        
        // 更新面包屑导航
        document.getElementById('article-title-breadcrumb').textContent = article.title;
        
        // 更新文章元数据
        document.getElementById('article-category').textContent = getCategoryName(article.category);
        document.getElementById('article-date').textContent = article.date;
        document.getElementById('article-author').textContent = `作者：${article.author}`;
        
        // 更新文章标题
        document.getElementById('article-title').textContent = article.title;
        
        // 更新文章图片
        document.getElementById('article-image').src = article.image;
        document.getElementById('article-image-caption').textContent = article.imageCaption;
        
        // 更新文章内容（这里不需要更新，因为我们使用的是当前页面的内容）
        // document.getElementById('article-body').innerHTML = article.content;
        
        // 更新文章标签
        updateArticleTags(article.tags);
        
        // 更新相关产品
        updateRelatedProducts(article.relatedProducts);
        
        // 更新相关文章
        updateRelatedArticles(article.relatedArticles);
        
        // 更新评论
        updateComments(article.comments);
    }
    
    /**
     * 显示文章未找到错误
     */
    function showArticleNotFound() {
        const articleContainer = document.querySelector('.article-content');
        articleContainer.innerHTML = `
            <div class="article-not-found">
                <i class="fas fa-exclamation-circle"></i>
                <h2 data-lang-key="article.notFound.title">文章未找到</h2>
                <p data-lang-key="article.notFound.message">
                    很抱歉，您请求的文章不存在或已被删除。
                </p>
                <a href="news.html" class="back-to-news" data-lang-key="article.notFound.back">
                    <i class="fas fa-arrow-left"></i> 返回资讯页面
                </a>
            </div>
        `;
    }
    
    /**
     * 更新文章标签
     */
    function updateArticleTags(tags) {
        const tagsContainer = document.querySelector('.article-tags');
        const tagsList = tagsContainer.querySelectorAll('.tag');
        
        // 清除现有标签
        tagsList.forEach(tag => tag.remove());
        
        // 添加新标签
        tags.forEach(tag => {
            const tagElement = document.createElement('a');
            tagElement.href = `news.html?search=${encodeURIComponent(tag)}`;
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }
    
    /**
     * 根据机型ID推导所属对比页
     */
    function comparePageFor(id) {
        const prefix = String(id || '').split('-')[0];
        const map = {
            iphone: 'iphone-compare.html', ipad: 'ipad-compare.html',
            watch: 'watch-compare.html', mac: 'mac-compare.html',
            airpods: 'airpods-compare.html', tv: 'tv-compare.html',
            vision: 'vision-compare.html', homepod: 'homepod-compare.html',
            ipod: 'ipod-compare.html'
        };
        return map[prefix] || 'iphone-compare.html';
    }

    /**
     * 更新相关产品
     */
    function updateRelatedProducts(products) {
        const productsContainer = document.querySelector('.related-products');
        const productCards = productsContainer.querySelectorAll('.product-card');
        
        // 清除现有产品卡片
        productCards.forEach(card => card.remove());
        
        // 添加新产品卡片
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <a href="${comparePageFor(product.id)}?highlight=${product.id}" data-lang-key="article.viewSpecs">查看详细参数</a>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
    }
    
    /**
     * 更新相关文章
     */
    function updateRelatedArticles(articles) {
        const articlesContainer = document.querySelector('.related-article-list');
        
        // 清除现有文章
        articlesContainer.innerHTML = '';
        
        // 添加新文章
        articles.forEach(article => {
            const articleItem = document.createElement('a');
            articleItem.href = `article.html?id=${article.id}`;
            articleItem.className = 'related-article-item';
            
            articleItem.innerHTML = `
                <div class="related-article-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="related-article-info">
                    <h4>${article.title}</h4>
                    <span class="related-article-date">${article.date}</span>
                </div>
            `;
            
            articlesContainer.appendChild(articleItem);
        });
    }
    
    /**
     * 更新评论
     */
    function updateComments(comments) {
        const commentsContainer = document.querySelector('.comments-list');
        
        // 清除现有评论
        commentsContainer.innerHTML = '';
        
        // 添加新评论
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            commentElement.innerHTML = `
                <div class="comment-avatar">
                    <img src="${comment.avatar}" alt="User avatar">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p class="comment-text">${comment.content}</p>
                    <div class="comment-actions">
                        <button><i class="fas fa-thumbs-up"></i> ${comment.likes}</button>
                        <button><i class="fas fa-reply"></i> <span data-lang-key="article.reply">回复</span></button>
                    </div>
                </div>
            `;
            
            commentsContainer.appendChild(commentElement);
        });
    }
    
    /**
     * 绑定事件处理器
     */
    function bindEventHandlers() {
        // 分享按钮
        document.querySelector('.social-btn:first-child').addEventListener('click', function() {
            // 创建分享链接
            const shareUrl = encodeURIComponent(window.location.href);
            const shareTitle = encodeURIComponent(document.getElementById('article-title').textContent);
            
            // 创建分享弹窗
            const shareModal = document.createElement('div');
            shareModal.className = 'share-modal';
            
            shareModal.innerHTML = `
                <div class="share-modal-content">
                    <h3 data-lang-key="article.share.title">分享文章</h3>
                    <div class="share-options">
                        <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}" target="_blank" class="share-option">
                            <i class="fab fa-twitter"></i>
                            <span>Twitter</span>
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="share-option">
                            <i class="fab fa-facebook"></i>
                            <span>Facebook</span>
                        </a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}" target="_blank" class="share-option">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn</span>
                        </a>
                        <button class="share-option" id="copy-link">
                            <i class="fas fa-link"></i>
                            <span data-lang-key="article.share.copyLink">复制链接</span>
                        </button>
                    </div>
                    <button class="close-modal" data-lang-key="article.share.close">关闭</button>
                </div>
            `;
            
            document.body.appendChild(shareModal);
            
            // 复制链接按钮
            document.getElementById('copy-link').addEventListener('click', function() {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const span = this.querySelector('span');
                    const originalText = span.textContent;
                    span.textContent = '链接已复制';
                    
                    setTimeout(() => {
                        span.textContent = originalText;
                    }, 2000);
                });
            });
            
            // 关闭弹窗
            shareModal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(shareModal);
            });
            
            // 点击弹窗外部关闭弹窗
            shareModal.addEventListener('click', function(event) {
                if (event.target === shareModal) {
                    document.body.removeChild(shareModal);
                }
            });
        });
        
        // 收藏按钮
        document.querySelector('.social-btn:last-child').addEventListener('click', function() {
            // 切换收藏状态
            this.classList.toggle('active');
            
            // 更新图标和文本
            const icon = this.querySelector('i');
            const span = this.querySelector('span');
            
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-bookmark';
                span.textContent = '已收藏';
                span.setAttribute('data-lang-key', 'article.saved');
            } else {
                icon.className = 'far fa-bookmark';
                span.textContent = '收藏';
                span.setAttribute('data-lang-key', 'article.save');
            }
            
            // 应用语言本地化
            applyLanguage(localStorage.getItem('preferredLanguage') || 'zh-CN');
        });
        
        // 评论提交
        document.querySelector('.comment-form button').addEventListener('click', function() {
            const commentTextarea = document.querySelector('.comment-form textarea');
            const commentText = commentTextarea.value.trim();
            
            if (commentText === '') {
                // 评论为空，显示提示
                const currentLang = localStorage.getItem('preferredLanguage') || 'zh-CN';
                const alertMsg = currentLang === 'zh-CN' ? '请输入评论内容' : 'Please enter your comment';
                alert(alertMsg);
                return;
            }
            
            // 创建新评论
            const newComment = {
                author: '游客',
                date: formatDate(new Date()),
                content: commentText,
                likes: 0,
                avatar: '../public/images/default-avatar.jpg'
            };
            
            // 添加新评论到列表
            const commentsContainer = document.querySelector('.comments-list');
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            commentElement.innerHTML = `
                <div class="comment-avatar">
                    <img src="${newComment.avatar}" alt="User avatar">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${newComment.author}</span>
                        <span class="comment-date">${newComment.date}</span>
                    </div>
                    <p class="comment-text">${newComment.content}</p>
                    <div class="comment-actions">
                        <button><i class="fas fa-thumbs-up"></i> ${newComment.likes}</button>
                        <button><i class="fas fa-reply"></i> <span data-lang-key="article.reply">回复</span></button>
                    </div>
                </div>
            `;
            
            // 将新评论插入到评论列表的顶部
            commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
            
            // 清空评论输入框
            commentTextarea.value = '';
            
            // 应用语言本地化
            applyLanguage(localStorage.getItem('preferredLanguage') || 'zh-CN');
        });
        
        // 加载更多评论按钮
        document.querySelector('.more-comments button').addEventListener('click', function() {
            // 模拟加载更多评论
            const moreComments = [
                {
                    author: '科技达人',
                    date: '2024-10-15 20:05',
                    content: '对比了一下A18 Pro和骁龙8 Gen 3，在单核性能上苹果还是领先不少，但多核差距在缩小。不过AI性能的40%提升确实令人印象深刻，这可能是苹果在这一代最大的突破。',
                    likes: 7,
                    avatar: '../public/images/user-avatar4.jpg'
                },
                {
                    author: '小苹果',
                    date: '2024-10-15 21:18',
                    content: '我已经预订了iPhone 16 Pro，看到这篇文章更期待了。不过我更关心它的实际使用体验，特别是电池续航和发热控制，希望真的像文章中说的那样有明显改善。',
                    likes: 4,
                    avatar: '../public/images/user-avatar5.jpg'
                }
            ];
            
            // 添加新评论到列表
            const commentsContainer = document.querySelector('.comments-list');
            
            moreComments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                
                commentElement.innerHTML = `
                    <div class="comment-avatar">
                        <img src="${comment.avatar}" alt="User avatar">
                    </div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <span class="comment-author">${comment.author}</span>
                            <span class="comment-date">${comment.date}</span>
                        </div>
                        <p class="comment-text">${comment.content}</p>
                        <div class="comment-actions">
                            <button><i class="fas fa-thumbs-up"></i> ${comment.likes}</button>
                            <button><i class="fas fa-reply"></i> <span data-lang-key="article.reply">回复</span></button>
                        </div>
                    </div>
                `;
                
                commentsContainer.appendChild(commentElement);
            });
            
            // 隐藏加载更多按钮，模拟已加载全部评论
            this.parentElement.style.display = 'none';
            
            // 应用语言本地化
            applyLanguage(localStorage.getItem('preferredLanguage') || 'zh-CN');
        });
        
        // 邮件订阅表单
        document.querySelector('.newsletter-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '' || !isValidEmail(email)) {
                const currentLang = localStorage.getItem('preferredLanguage') || 'zh-CN';
                const alertMsg = currentLang === 'zh-CN' ? '请输入有效的电子邮箱地址' : 'Please enter a valid email address';
                alert(alertMsg);
                return;
            }
            
            // 模拟订阅成功
            const currentLang = localStorage.getItem('preferredLanguage') || 'zh-CN';
            const successMsg = currentLang === 'zh-CN' ? '订阅成功！感谢您的关注' : 'Successfully subscribed! Thank you for your interest';
            alert(successMsg);
            
            // 清空输入框
            emailInput.value = '';
        });
    }
    
    /**
     * 初始化返回顶部按钮
     */
    function initBackToTopButton() {
        const backToTopButton = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /**
     * 获取分类名称
     */
    function getCategoryName(categoryKey) {
        const categories = {
            'news': '新闻动态',
            'reviews': '产品评测',
            'guides': '使用指南',
            'comparisons': '产品对比',
            'rumors': '传闻爆料'
        };
        
        return categories[categoryKey] || categoryKey;
    }
    
    /**
     * 格式化日期
     */
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    
    /**
     * 验证邮箱格式
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * 应用语言本地化
     */
    function applyLanguage(lang) {
        // 这个函数会由language-switcher.js调用
        // 不需要在这里实现
    }
});
