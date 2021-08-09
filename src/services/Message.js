import { Subject } from "rxjs"

const subject = new Subject()
export const messageService = {
  pushMessage: (message) => {
    subject.next(message)
  },
  getMessage: () => subject.asObservable(),
}
