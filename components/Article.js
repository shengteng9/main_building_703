import {
	Card,
	Button,
	CardImg,
	CardText,
	CardBody,
	CardLink,
	CardTitle,
	CardSubtitle
} from 'reactstrap';

const Article = porps => {
	return (
		<div className="Article_wrap">
			<div className="Article_title"><h4>文章标题</h4></div>
	<div className="Article_info">作者 2020-07-22 13:46</div>
	{ /*<img src="" />*/ }
			<div className="Article_text">文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</div>
			<style jsx>{`
				.Article_wrap {
					margin:0 0 2rem 0;
					padding:1.5rem;
					border:1px solid #FFFAF0;
				}
				.Article_title{
				}
				.Article_info{
					font-size:12px;
					color:#8B8B7A;
					margin:1rem 0;
				}
				.Article_text{
					font-size:0.875rem;
				}
			`}</style>
	  </div>
	)
}

export default Article;