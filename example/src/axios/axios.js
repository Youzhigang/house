import axios from 'axios'
import isUndefined from 'lodash/isUndefined'
import AxiosHelper from './AxiosHelper'
import { captureException } from '../sentry'

let request

export default function (config) {
  if (isUndefined(request)) {
    // Create AxiosHelper instance
    const axiosHelper = new AxiosHelper()

    // Create Axios instance and configure it
    request = axios.create(axiosHelper.config())

    // Listen response
    request.interceptors.response.use(null, error => {
      captureException(error)
      axiosHelper.error(error)
      return Promise.reject(error)
    })
  }

  return request(config)
}
