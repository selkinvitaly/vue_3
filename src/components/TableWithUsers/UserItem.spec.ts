import { shallowMount, Wrapper } from '@vue/test-utils';
import * as sinon from 'sinon';

import HelloWorld from './UserItem.vue';
import { User } from '../../models/users';


const testUser: User = {
    email: 'test@email.com',
    birthday: '12.12.2000',
    avatarUrl: 'https://xxx.com/me.jpg',
    firstName: 'vitaly',
    lastName: 'selkin',
    phone: '89998887755',
    titleName: 'mr',
    biography: 'about me',
    uuid: '9a4b3485-f663-4323-9a30-dc970f07dcaa'
};

const testIndex = 0;

describe('UserItem.vue', () => {

    let wrapper: Wrapper<HelloWorld> | null = null;

    beforeEach(() => {
        wrapper = shallowMount(HelloWorld, {
            propsData: { user: testUser, index: testIndex }
        });
    });

    it('should be component', () => {
        expect(wrapper!.isVueInstance).toBeTruthy();
    });

    it('should has "hasAvatar" getter', () => {
        expect((wrapper!.vm as any).hasAvatar).toStrictEqual(true);
    });

    it('should has "fullName" getter', () => {
        const expectFullName = `${testUser.titleName}. ${testUser.firstName} ${testUser.lastName}`;
        expect((wrapper!.vm as any).fullName).toStrictEqual(expectFullName);
    });

    it('should get "user" in props', () => {
        expect(wrapper!.vm.$props.user).toStrictEqual(testUser);
    });

    it('should get "index" in props', () => {
        expect(wrapper!.vm.$props.index).toStrictEqual(testIndex);
    });

    it('should has button elem', () => {
        expect(wrapper!.contains('button')).toBeTruthy();
    });

    it('should has img elem', () => {
        expect(wrapper!.contains('img')).toBeTruthy();
    });

    it('should has corrected url for avatar elem', () => {
        expect(wrapper!.find('img').attributes().src).toStrictEqual(testUser.avatarUrl!);
    });

    it('should emit "view-user" event with uuid', () => {
        wrapper!.find('.useritem__fullname').trigger('click');

        expect(wrapper!.emitted()['view-user'][0][0]).toStrictEqual(testUser.uuid);
    });

    it('should call "viewUser" method', () => {
        const spy = sinon.spy();
        (wrapper!.vm as any).viewUser = spy;

        wrapper!.find('.useritem__fullname').trigger('click');
        expect(spy.calledOnce).toBeTruthy();
    });

    it('should emit "delete-user" event with uuid', () => {
        wrapper!.find('.useritem__delete').trigger('click');

        expect(wrapper!.emitted()['delete-user'][0][0]).toStrictEqual(testUser.uuid);
    });

});
