<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold my-2"
      >
        Cuenta
      </CDropdownHeader>
      <CDropdownItem @click="logOut">
        <CIcon icon="cil-lock-locked" /> Cerrar Sesion
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/avatar.jpeg';
import { useRouter } from 'vue-router';

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {    
    const router = useRouter();
    const logOut = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userFullName');
      localStorage.removeItem('userToken');
      
      router.push('/auth');
    };
    return {
      avatar: avatar,
      itemsCount: 42,
      logOut
    }
  },
  methods: {
  }
}
</script>