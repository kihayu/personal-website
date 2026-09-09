<template>
  <ProfileCard
    :name="text(node.props.name)"
    :role="text(node.props.role)"
    :location="text(node.props.location)"
    :photo="photo"
    :widths="schema.breakpoints"
    :annotate="annotate"
    :annotate-slot="annotateSlot"
  >
    <template #links>
      <CmsSlot name="links" annotated />
    </template>
  </ProfileCard>
</template>

<script setup lang="ts">
import { type BlockProps, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isAssetRef } from '@cms/content-model'
import { computed } from 'vue'
import ProfileCard from '~/components/profile/ProfileCard.vue'
import { text } from '~/utils/blockProps'
import schema from './ProfileCardBlock.schema.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const photo = computed(() => (isAssetRef(props.node.props.photo) ? props.node.props.photo : undefined))
</script>
