<template>
  <div class="hello">
      <div>
        要了解堆首先得了解一下二叉树，在计算机科学中，二叉树是每个节点最多有两个子树的树结构。通常子树被称作“左子树”
        （left subtree）和“右子树”（right subtree）。二叉树常被用于实现二叉查找树和二叉堆。
        二叉树的每个结点至多只有二棵子树（不存在度大于 2 的结点），二叉树的子树有左右之分，
        次序不能颠倒。二叉树的第 i 层至多有 2i - 1 个结点；深度为 k 的二叉树至多有 2k - 1 个结点；
        对任何一棵二叉树 T，如果其终端结点数为 n0，度为 2 的结点数为 n2，则n0 = n2 + 1。
        树和二叉树的三个主要差别
        树的结点个数至少为 1，而二叉树的结点个数可以为 0
        树中结点的最大度数没有限制，而二叉树结点的最大度数为 2
        树的结点无左、右之分，而二叉树的结点有左、右之分
        二叉树又分为完全二叉树（complete binary tree）和满二叉树（full binary tree）
        满二叉树：一棵深度为 k，且有 2k - 1 个节点称之为满二叉树
      </div>
      <back-to-top :screenNum = 0.5 />
  </div>
</template>
<script>
import BackToTop from '@/components/backtoTop/BackToTop'
export default {
  components: {
    BackToTop
  }
}
</script>
<style>
.hello {
  height: 2000px;
}
</style>

