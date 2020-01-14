import { graphql } from 'gatsby'
import React from 'react'
import {
  ComponentImport,
  Heading,
  LinkedHeading,
  MDXRenderer,
} from '@docpocalypse/gatsby-theme'
import PageLayout from '../components/PageLayout'
import Props from '../components/Props'

function ComponentPageTemplate({ data }) {
  const { metadata, importName, name } = data.docpocalypse

  let WidgetDemo = require(`../demos/${name}`).default

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

      {metadata.description && metadata.description.childMdx && (
        <>
          <div>
            <MDXRenderer scope={{ React }}>
              {metadata.description.childMdx.body}
            </MDXRenderer>
          </div>
          <WidgetDemo
            shortcuts={metadata?.description?.childMdx.frontmatter.shortcuts}
          />
        </>
      )}
      <LinkedHeading h={2} id={`${name}-api`}>
        API
      </LinkedHeading>
      <Props metadata={metadata} />
    </PageLayout>
  )
}

export default ComponentPageTemplate

export const pageQuery = graphql`
  query($nodeId: String) {
    docpocalypse(id: { eq: $nodeId }) {
      id
      name
      importName

      metadata {
        id
        description {
          childMdx {
            body
            frontmatter {
              shortcuts {
                key
                label
              }
            }
          }
        }
        ...PropsTable_metadata
      }
    }
  }
`
