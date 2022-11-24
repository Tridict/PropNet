import { createElement as vNode } from "../../../vendor/react.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { Form, Input, Button, Tabs, MessagePlugin } from "../../../vendor/tdesign.min.js";
import { login, register } from "../../utils/api/user.js";

const { FormItem } = Form;
const { TabPanel } = Tabs;
const { useNavigate } = ReactRouterDom;


export function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const rules = {
    'account': [{ required: true, message: '必填', type: 'error' }],
    password: [{ required: true, message: '必填', type: 'error' }],
  };

  const onSubmit = async (e) => {
    if (e.validateResult === true) {
      const data = await login(form.getFieldsValue(['account','password']));
      console.log(data);
      if (data.access_token) {
        MessagePlugin.success('登录成功');
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

  return vNode(Form, {
        form,
        onSubmit,
        onReset,
        colon: true,
        rules,
      }, [
        vNode(FormItem, {name: 'account'}, 
          vNode(Input, {
            placeholder: '请输入账户名',
          })
        ),
        vNode(FormItem, {name: 'password'}, 
          vNode(Input, {
            type: 'password',
            placeholder: '请输入密码',
          })
        ),
        vNode(FormItem, null, [
          vNode(Button, {
            theme: 'primary',
            type: 'submit',
          }, '登录'),
          vNode(Button, {
            theme: 'default',
            type: 'reset',
            variant: 'base',
          }, '重置'),
        ])
      ]);
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
               { max: 20, message: '请不要超过30个字', type: 'error' }],
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

  return vNode(Form, {
        form,
        statusIcon: true,
        onSubmit,
        onReset,
        rules,
      }, [
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
  ]);
}

export default function LoginHome() {
  return vNode(Tabs, {defaultValue: 1}, [
    vNode(TabPanel, {value: 1, label: '登录'}, vNode(Login)),
    vNode(TabPanel, {value: 2, label: '注册'}, vNode(Register)),
  ]);
}
