import { getApiDocs } from '@/lib/swagger'
import ReactSwagger from '../../../components/doc/api-doc'

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <div className='pt-6'>
      <section className='container'>
        <ReactSwagger spec={spec} url='/swagger.json' />
      </section>
    </div>
  )
}