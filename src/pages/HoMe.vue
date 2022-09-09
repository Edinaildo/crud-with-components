<template>
  <div id="home">
    <nav class="orange darken-2">
      <div class="nav-wrapper"></div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </nav>

    <div v-show="exibir.lista" style="padding: 20px">
      <button @click="mostrarCadastro">Adicionar</button>
    </div>
    <!-- LISTA -->

    <div v-show="exibir.lista">
      <TarefaList msg="Welcome to Your Vue.js Home" :tasks="listaDeTarefas" />
    </div>

    <!-- FORM -->
    <div v-show="exibir.form">
      <h2>Cadastrar Tarefa</h2>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Entre com a tarefa"
        v-model="form.title"
      />
      <input
        type="text"
        name="project"
        v-model="form.project"
        placeholder="Entre com um projeto"
      />
      <button @click="salvarTarefa">Salvar</button>
    </div>
  </div>
</template>

<script>
import TasksApi from "../TasksApi.js";
import TarefaList from "../components/TarefaList.vue";

export default {
  name: "HoMe",
  components: {
    TarefaList,
  },
  data: () => {
    return {
      listaDeTarefas: [],
      exibir: {
        lista: true,
        form: false,
      },
      form: {
        title: "",
        project: "",
      },
    };
  },
  methods: {
    listarTarefas() {
      TasksApi.getTasks((data) => {
        this.listaDeTarefas = data;
      });
    },
    mostrarCadastro() {
      this.exibir.form = true;
      this.exibir.lista = false;
    },
    salvarTarefa() {
      this.exibir.form = false;
      this.exibir.lista = true;
      const novaTarefa = {
        title: this.form.title,
        project: this.form.project,
        data: new Date().toLocaleDateString("pt"),
      };
      TasksApi.createTask(novaTarefa, () => {
        this.listarTarefas();
      });
    },
  },

  created() {
    this.listarTarefas();
  },
};
</script>

<style></style>
