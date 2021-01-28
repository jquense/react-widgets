import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import {
  DropdownList,
  DatePicker,
  NumberPicker,
  Multiselect,
} from 'react-widgets'
import styles from './styles.module.css'
import generateData from '../generate-data'

const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
]

const people = generateData(10)

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout title={siteConfig.title} className="flex">
      <main className="flex md:flex-row flex-col h-100 md:space-x-10 space-y-6 mt-10 pb-20 items-center justify-around self-center">
        <div>
          <h1 className="hero__title" style={{}}>
            Build <span className="text--primary">Beautiful</span> Forms
          </h1>
          <p className="hero__subtitle ">
            Polished, feature rich, accessible form inputs
          </p>
        </div>
        <div className={`flex-col space-y-6 flex-grow ${styles.inputs}`}>
          <DropdownList
            data={people}
            defaultValue={people[0]}
            textField="name"
          />
          <DatePicker
            defaultValue={new Date()}
            valueFormat={{ month: 'short', day: '2-digit', year: 'numeric' }}
          />
          <NumberPicker
            defaultValue={1305043}
            format={{ style: 'currency', currency: 'USD' }}
          />
          <Multiselect
            data={['JavaScript', 'ML', 'Scripting', 'CSS', 'HTML']}
            defaultValue={['CSS', 'HTML']}
          />

          <div>
            <Link to="/docs/">
              <strong>See more…</strong>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
