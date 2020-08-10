import {
	ListGroup,
	ListGroupItem
} from 'reactstrap';

const Catalog = props => {
	return (
		<div className="catalog_content">
			<h4 className="title">分类</h4>
			<ul>
				<li>分类1 <span className="textNum">(1)</span></li>
				<li>分类2 <span className="textNum">(2)</span></li>
				<li>分类3 <span className='textNum'>(10)</span></li>
			</ul>
			<style jsx>{`
				.catalog_content{
					border:1px solid #FFFAF0;
				}
				@media screen and (max-width: 767px) {
					.catalog_content{
						display:none;
					}
				}
				.title{
					padding-left:1rem;
					height:70px;
					line-height: 70px;
					border-bottom:1px solid #FFFAF0;
				}
				ul{
					list-style:none;
					padding:0;
				}
				ul li {
					padding:0 1rem;
					margin:0;
					height:50px;
					line-height:50px;

					border-bottom:1px solid #FFFAF0;
				}
				ul li:last-child{
					border-bottom:none;
				}
				ul li span {
					float:right;
					color:#8B8B7A;
					font-size:12px;
				}
				ul li:hover{
					background-color:#FFFAF0;
					cursor:pointer;
				}

			`}</style>
		</div>
	)
}

export default Catalog;