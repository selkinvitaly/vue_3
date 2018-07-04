<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <button
                            @click="confirm"
                            class="waves-effect waves-light btn red accent-2"
                        >Delete <i class="material-icons right">delete</i></button>
                        <button
                            @click="cancel"
                            class="waves-effect waves-light btn teal"
                        >Cancel <i class="material-icons right">cancel</i></button>
                    </div>
                </div>
            </div>
        </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';


@Component({})
export default class DeleteUserModal extends Vue {

    confirm(): void {
        this.$emit('confirm');
    }

    cancel(): void {
        this.$emit('cancel');
    }
}
</script>

<style lang="stylus" scoped>
.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(#000, .5)
  display: table
  transition: opacity .3s ease

.modal-wrapper
  display: table-cell
  vertical-align: middle

.modal-container
  width: 400px
  margin: 0px auto
  padding: 20px 30px
  background-color: #fff
  border-radius: 2px
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
  transition: all .3s ease
  font-family: Helvetica, Arial, sans-serif

.modal-header h3
  margin-top: 0
  color: #42b983

.modal-body
  margin: 20px 0

.modal-footer
  display: flex
  justify-content space-around

.modal-default-button
  float: right

// animations styles
.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)
</style>
