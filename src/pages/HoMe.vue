<template>
  <div id="home">
    <nav class="orange darken-2">
      <div class="nav-wrapper"></div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </nav>

    <div v-show="exibir.lista" style="padding: 20px">
      <button class="btn" @click="mostrarCadastro">Adicionar</button>
    </div>
    <!-- LISTA -->

    <div v-show="exibir.lista">
      <TarefaList
        :msg="'Lista de Tarefas'"
        :tasks="listaDeTarefas"
        @editarClick="recebiEditar"
        @deletarClick="recebiDeletar"
      />
    </div>
    <!-- FORM -->
    <div v-show="exibir.form">
      <TarefaForm
        :id="form.id"
        :titulo="form.titulo"
        :title="form.title"
        :project="form.project"
        :btn="form.btn"
        @salvarClick="recebiSalvar"
        @alterarClick="recebiAlterar"
      ></TarefaForm>
    </div>
  </div>
</template>

<script>
import TasksApi from "../TasksApi.js";
import TarefaList from "../components/TarefaList.vue";
import TarefaForm from "../components/TarefaForm.vue";

export default {
  name: "HoMe",
  components: {
    TarefaList,
    TarefaForm,
  },
  data: () => {
    return {
      listaDeTarefas: [],
      exibir: {
        lista: true,
        form: false,
      },
      form: {
        id: 0,
        titulo: "Cadastrar Tarefa",
        title: "",
        project: "",
        btn: "Adicionar",
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
      this.form.btn = "Adicionar";
      this.exibir.form = true;
      this.exibir.lista = false;
    },
    recebiSalvar(novaTarefa) {
      TasksApi.createTask(novaTarefa, () => {
        this.listarTarefas();
        this.exibir.form = false;
        this.exibir.lista = true;
      });
    },
    recebiAlterar(tarefa) {
      TasksApi.updateTasks(tarefa, () => {
        this.listarTarefas();
        this.exibir.form = false;
        this.exibir.lista = true;
      });
    },
    recebiDeletar(tarefa) {
      TasksApi.deleteTasks(tarefa, () => {
        this.listarTarefas();
        this.exibir.form = false;
        this.exibir.lista = true;
      });
    },
    recebiEditar(tarefaId) {
      this.form.btn = "Alterar";
      TasksApi.getTask(tarefaId, (task) => {
        this.form.id = task.id;
        this.form.title = task.title;
        this.form.project = task.project;
        this.exibir.form = true;
        this.exibir.lista = false;
      });
    },
  },

  created() {
    this.listarTarefas();
  },
};
</script>

<style></style>
