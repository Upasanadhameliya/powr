import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard( props ) {
  return (
    <Card>
      <CardBody className="flex items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{props.title}</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{props.value}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
