const getFormProps = ({ form, onFinish, resource }) => {
  return {
    layout: 'vertical',
    colProps: { span: 12 },
    rowProps: { gutter: 10 },
    grid: true,
    size: 'middle',
    style: {
      margin: 'auto',
      marginTop: 8,
    },
    name: 'basic',
    form: form,
    onFinish: (v) => onFinish(v),
    initialValues: resource,
  };
};
export const getSmallFormProps = ({ form, onFinish, resource }) => {
  return {
    layout: 'vertical',
    colProps: { span: 7 },
    rowProps: { gutter: 5 },
    grid: true,
    size: 'middle',
    style: {
      margin: 'auto',
      marginTop: 8,
    },
    name: 'basic',
    form: form,
    onFinish: (v) => onFinish(v),
    initialValues: resource,
  };
};

export default getFormProps;
