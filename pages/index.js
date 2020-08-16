import Link from 'next/link';
import '../style/pmp.less';
import Header from '../components/Header'
import Layout from '../components/Layout'
import HeaderInfo from '../components/HeaderInfo'

const headerInfo = {
  title: 'zhulou703' ,
  description: 'zhulou703的个人站点'
}
const Index = () => {
  return (
    <Layout>
      <HeaderInfo title={headerInfo.title} description={headerInfo.description}/>
      <Header />
      <div className="content_wrap">
        <Link href="/pmp"><a>PMP习题库</a></Link>
      </div>
    </Layout>
  )
}

export default Index