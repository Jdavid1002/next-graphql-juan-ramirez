
'use server';

import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'

export const GET = async (request : Request) => {
  try {
    const { searchParams } = new URL(request.url)

    const name = searchParams.get('name')
    const page = searchParams.get('page')

    const only_humans = searchParams.get('only_humans') === 'false' ? false : true
    const filter_humans = only_humans ? ', species : "Human" ' : ''
    
    const {data} = await getClient().query({
      query : gql`
        query {
          characters(page: ${page}, filter: { name: "${name}" ${filter_humans} }) {
            info {
              count
            }
            results {
              name,
              image,
              species
            }
          }
        }
      `
    })
    
    return Response.json({ data}, {
      status : 200
    })

  } catch (error) {
    return Response.json({ message : 'Have error in the server.' }, {
      status : 500
    })
  }
}