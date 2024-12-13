import * as yup from 'yup';

const validationCreateChannel = (t) => yup.object({
  channelName: yup.string()
    .min(6, t('validationErrors.min6')) 
    .max(20, t('validationErrors.max20')) 
    .required(t('validationErrors.required'))
    .test('is-unique', (t('validationErrors.channelAlreadyExists')), function(value) {
      const { channels } = this.options.context;
      return !channels.some(channel => channel.name === value);
    }),
});

export default validationCreateChannel;
