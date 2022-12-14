import { createElement as vNode, useState } from "../../../vendor/react.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { Form, Input, Button, Tabs, MessagePlugin, Switch, Space } from "../../../vendor/tdesign.min.js";
import { UserApi } from "../../utils/api/api.js";
const { login, register } = UserApi;
// import { login, register } from "../../utils/api/user.js";
import storage from "../../utils/store.js";

const { FormItem } = Form;
const { TabPanel } = Tabs;
const { useNavigate } = ReactRouterDom;


export function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [checkedRememberUser, setCheckedRememberUser] = useState(true);

  const rules = {
    'account': [{ required: true, message: '必填', type: 'error' }],
    password: [{ required: true, message: '必填', type: 'error' }],
  };

  const onSubmit = async (e) => {
    if (e.validateResult === true) {
      if (checkedRememberUser) {
        storage.setItem('cache_account', form.getFieldValue('account'));
      } else {
        storage.removeItem('cache_account');
      }
      const wrapped = await login(form.getFieldsValue(['account','password']));
      console.log(wrapped);
      if (wrapped?.data?.data?.access_token) {
        MessagePlugin.success('登录成功');
        navigate('../user');
      } else if (wrapped?.data?.msg) {
        MessagePlugin.error(wrapped?.data?.msg);
      } else if (wrapped?.statusText) {
        MessagePlugin.error(wrapped?.statusText);
      }
    } else {
      MessagePlugin.info('请填入正确的内容');
    }
  };

  const onReset = (e) => {
    console.log(e);

  };

  const onToggleRememberUser = (value) => {
    setCheckedRememberUser(value);
  }

  const theForm = () => vNode(Form, {
    form,
    onSubmit,
    onReset,
    colon: true,
    rules,
  }, vNode(Space, {direction: 'vertical'}, [
    vNode(FormItem, {name: 'account', initialData: storage.getItem('cache_account')}, 
      vNode(Input, {
        placeholder: '请输入账户名',
        autocomplete: 'username',
      })
    ),
    vNode(FormItem, {name: 'password'}, 
      vNode(Input, {
        type: 'password',
        placeholder: '请输入密码',
        autocomplete: 'current-password',
      })
    ),
    vNode(Space, null, [
      '记住用户名',
      vNode(Switch, {
        value: checkedRememberUser,
        onChange: onToggleRememberUser,
      })]
    ),
    vNode(FormItem, null, vNode(Space, null, [
      vNode(Button, {
        theme: 'primary',
        type: 'submit',
      }, '登录'),
      vNode(Button, {
        theme: 'default',
        type: 'reset',
        variant: 'base',
      }, '重置'),
    ]))
  ]));

  return vNode('div', {
    className: "container m-4 py-2 px-2",
  }, theForm());
}

export function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 自定义异步校验器
  function rePasswordValidator(val) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(form.getFieldValue('password') === val);
        clearTimeout(timer);
      });
    });
  }

  const rules = {
    email: [{ required: true, message: '必填', type: 'error' }, 
            { email: { ignore_max_length: true }, message: '请输入正确的邮箱格式', type: 'error' }],
    username: [{ required: true, message: '必填', type: 'error' },
               { max: 20, message: '请不要超过20个字', type: 'error' }],
    password: [{ required: true, message: '必填', type: 'error' }, 
               { min: 6, message: '至少需要6位数', type: 'error' }],
    rePassword: [{ validator: rePasswordValidator, message: '两次密码不一致' }],
  };

  const onSubmit = async (e) => {
    if (e.validateResult === true) {
      const data = await register(form.getFieldsValue(['email', 'username','password']))
      console.log(data)
      if (data.ok) {
        MessagePlugin.success('注册成功');
        navigate('/user');
      } else if (data.msg) {
        MessagePlugin.error(data.msg);
      }
    } else {
      MessagePlugin.info('请填入正确的内容');
    }
  };

  const onReset = (e) => {
    console.log(e);
  };

  const theForm = () => vNode(Form, {
      form,
      statusIcon: true,
      onSubmit,
      onReset,
      rules,
    },  vNode(Space, {direction: 'vertical'}, [
  vNode(FormItem, {name: 'email'}, [
    vNode(Input, {
      placeholder: '请输入您的email',
    })
  ]),
  vNode(FormItem, {name: 'username'}, [
    vNode(Input, {
      placeholder: '请输入账户名',
    })
  ]),
  vNode(FormItem, {name: 'password'}, [
    vNode(Input, {
      type: 'password',
      placeholder: '请输入密码',
      autocomplete: 'current-password',
    })
  ]),
  vNode(FormItem, {name: 'rePassword'}, [
    vNode(Input, {
      type: 'password',
      placeholder: '请再次确认密码',
    })
  ]),
  vNode(FormItem, null, 
    vNode(Button, {
      theme: 'primary',
      type: 'submit',
    }, '注册'))
  ]));

  return vNode('div', {
    className: "container m-4 py-2 px-2",
  }, theForm());
}

export default function LoginHome() {
  const main = () => vNode(Tabs, {defaultValue: 1, className: 'login'}, [
    vNode(TabPanel, {value: 1, label: '登录'}, vNode(Login)),
    vNode(TabPanel, {value: 2, label: '注册'}, vNode(Register)),
  ]);
  return vNode('div', {
    className: "container",
    style: {
      margin: "0 auto",
      "max-width": "400px",
    },
  }, main());
}
