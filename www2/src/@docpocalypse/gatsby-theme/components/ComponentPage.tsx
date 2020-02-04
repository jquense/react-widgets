import { graphql } from 'gatsby'
import React from 'react'
import {
  ComponentImport,
  Heading,
  LinkedHeading,
  MDXRenderer,
} from '@docpocalypse/gatsby-theme'
import PageLayout from '../../../components/PageLayout'
import Props from '../../../components/Props'

function ComponentPageTemplate({ data }) {
  const { description, importName, name } = data.docpocalypse

  let WidgetDemo = require(`../../../demos/${name}`).default

  if (WidgetDemo.default) WidgetDemo = WidgetDemo.default

  return (
    <PageLayout>
      <div>
        <Heading level={1} id={`${name}-page`} title={name}>
          {name}
        </Heading>
      </div>

      <div>
        {importName && (
          <ComponentImport
            importName={importName}
            docNode={data.docpocalypse}
          />
        )}
      </div>

      {description?.mdx && (
        <>
          <div>
            <MDXRenderer scope={{ React }}>{description.mdx.body}</MDXRenderer>
          </div>
          <WidgetDemo shortcuts={description.mdx.frontmatter.shortcuts} />
        </>
      )}
      <LinkedHeading h={2} id={`${name}-api`}>
        API
      </LinkedHeading>
      <Props metadata={data.docpocalypse.docpocalypse} />
    </PageLayout>
  )
}

export default ComponentPageTemplate
