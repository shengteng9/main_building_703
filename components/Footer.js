const Footer = props => {
	return (
		<footer className="footer_wrap">
			<div className="info">这是底部信息</div>
			<style jsx>{`
				.footer_wrap{
					height:30px;
					line-height:30px;
					border:1px solid orange;
				}
				.footer_wrap .info{
					color:orange;
				}
			`}</style>
		</footer>
	)
}

export default Footer;