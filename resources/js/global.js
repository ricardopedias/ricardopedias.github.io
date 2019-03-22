/**
 * Projeto: ERP-Solutions
 * Author: Ricardo Pereira <rpdesignerfly@gmail.com>
 * ----------------------------------------------------------------------------
 * Neste arquivo estão implementadas as funcionalidades globais
 * para utilização na aplicação.
 * Apenas funcionalidades REUTILIZÁVEIS se encontram aqui!
 * ----------------------------------------------------------------------------
 */

(function ($) {

    "use strict";

    var GlobalFeatures = function(context) {
        this.construct(context);
    };

    GlobalFeatures.prototype = {

        context: document,

        construct : function(context)
        {
            if (undefined !== context) {
                this.context = context;
            }

            // var $this = this;
            this.initTooltipPlugin(this.context);
            this.initPopoverPlugin(this.context);
            this.initSlimScrollPlugin(this.context);
            this.initRangeSlider(this.context);
            this.initSwitchery(this.context);
            this.initKnob(this.context);
            this.initCounterUp(this.context);
            this.initDataTable(this.context);
            this.initMultiselect(this.context);
            this.initAutonumber(this.context);
            this.initInputmask(this.context);
            this.initCustomModal();
        },

        // Tooltips
        initTooltipPlugin : function(context)
        {
            $.fn.tooltip && $('[data-toggle="tooltip"]', context).tooltip()
        },

        // Popovers
        initPopoverPlugin : function(context)
        {
            $.fn.popover && $('[data-toggle="popover"]', context).popover()
        },

        // Slimscroll
        initSlimScrollPlugin : function(context)
        {
            // aqui pode-se mudar a cor da barra de rolagem
            $.fn.slimScroll &&  $(".slimscroll-alt", context).slimScroll({ position: 'right',size: "5px", color: '#98a6ad',wheelStep: 10});
        },

        // Slider
        initRangeSlider : function()
        {
            $.fn.slider && $('[data-plugin="range-slider"]', context).slider({});
        },

        // -------------
        // Formulário
        //

        // Switchery
        initSwitchery : function(context)
        {
            $('[data-plugin="switchery"]', context).each(function (idx, obj) {
                new Switchery($(this)[0], $(this).data());
            });
        },

        // Knob
        initKnob : function(context)
        {
             $('[data-plugin="knob"]', context).each(function(idx, obj) {
                $(this).knob();
             });
        },

        // CounterUp
        initCounterUp : function(context)
        {
            var delay = $(this).attr('data-delay')?$(this).attr('data-delay'):100; //default is 100
            var time = $(this).attr('data-time')?$(this).attr('data-time'):1200; //default is 1200
             $('[data-plugin="counterup"]', context).each(function(idx, obj) {
                $(this).counterUp({
                    delay: 100,
                    time: 1200
                });
             });
         },

         initMultiselect: function(context)
         {

             // Cria o novo elemento como opção adicional
             function SelectRemoveAll() {};

             SelectRemoveAll.prototype.render = function (decorated) {

                 var self = this;
                 var rendered = decorated.call(this);

                 // Cria os botões de ação
                 var selectAll = $(''
                     + '<table class="select2-select-remove-all"><tr>'
                     + '<td class="select-all"><i class="fas fa-plus"></i> Marcar Todos</td>'
                     + '<td class="unselect-all"><i class="fas fa-times"></i> Desmarcar Todos</td>'
                     + '</tr></table>'
                 );

                 // Adiciona os botões como primeira opção da lista
                 rendered.find('.select2-dropdown').prepend(selectAll);

                 // $('.select-all, .unselect-all', selectAll).on('hover', function(){
                 //     $('.select2-results__option').removeClass('select2-results__option--highlighted');
                 // });

                 $('.select-all, .unselect-all', selectAll).on('click', function (e, one, two) {

                     var option_id = rendered.find('.select2-results__option:eq(0)').attr('id');
                     var length = option_id.indexOf("-result");
                     var select_id = option_id.substr(0, length).replace('select2-', '');

                     // var results = rendered.find('.select2-results__option[aria-selected=false]');

                    if ($(this).hasClass('select-all') == true ){

                        var options_list = [];
                        $('#' + select_id + ' option').each(function(){
                            options_list.push($(this).val());
                        });
                        $('#' + select_id).val(options_list).trigger('change');


                    } else if ($(this).hasClass('unselect-all') == true ){

                        $('#' + select_id).val(null).trigger('change');
                     }

                     $('#' + select_id).select2('close');
                });

                return rendered;
            };

             $('[data-plugin="multiselect"]', context).each(function(){

                 var elem = this;
                 var settings = {
                     //theme: 'bootstrap4',
                     tags: true,
                     tokenSeparators: [',', ' '],
                     placeholder: 'Selecione...',
                     dropdownAdapter: Utils.Decorate(
                         Utils.Decorate(
                             Dropdown,
                             AttachBody
                         ),
                         SelectRemoveAll
                     ),
                 };
                 var limit = $(this).data('limit');
                 var place = $(this).data('place');
                 var clear = $(this).data('clear');
                 var confirm = $(this).data('confirm');

                 if (undefined !== limit) {
                     settings.maximumSelectionLength = limit;
                 }

                 if (undefined !== place) {
                     settings.placeholder = place;
                 }

                 if (undefined !== clear) {
                     settings.allowClear = true;
                 }

                 $(elem).select2(settings);

                 //if (undefined !== confirm) {

                    $(elem).on('select2:unselecting', function (event) {

                         var self = this;

                         Swal.fire({
                             title: 'Você tem certeza?',
                             text: "Você está prestes a desvincular este item!",
                             type: 'warning',
                             showCancelButton: true,
                             confirmButtonText: 'Sim, desvincular!',
                             cancelButtonText: 'Não, cancelar!',
                             confirmButtonClass: 'btn btn-success mt-2',
                             cancelButtonClass: 'btn btn-danger ml-2 mt-2',
                             buttonsStyling: false,
                             onBeforeOpen: function(){

                                 var header = $(Swal.getContent()).prev();

                                 // Oculta o icone padrão de warning
                                 $('.swal2-warning', header).hide();

                                 // Cria um ícone personalizado
                                 var custom_icon = ''
                                    + '<div class="swal2-icon swal2-info swal2-animate-info-icon swal2-icon-unlink" style="display: flex; border: 0px solid transparent;">'
                                    + '<span class="swal2-icon-text"><i class="fas fa-link"></i></span>'
                                    + '</div>';
                                 $('.swal2-warning', header).before(custom_icon);

                             }
                         }).then(function (result) {

                             if (result.dismiss === 'cancel') {

                                 // Swal.fire({
                                 //     title: 'Cancelado',
                                 //     text: "Nada foi efetuado!",
                                 //     type: 'error',
                                 //     confirmButtonClass: 'btn btn-confirm mt-2'
                                 // });

                             } else {

                                 $('option[value="' + event.params.args.data.id + '"]', self).prop('selected', false);
                                 $(elem).trigger('change.select2');
                             }
                         });

                         return false;

                    });
                 //}

             });
        },

         // Datatable
         initDataTable : function(context)
         {
             // Configura o datagrid
             $('[data-plugin="datatable"]', context).each(function(){

                 var url  = $(this).data('provider');

                 var search  = 'no';
                 var order   = 'no';
                 var actions = 'no';

                 var columns   = [];
                 var direction = [];

                 $('thead th', this).each(function(index){

                     if (undefined !== $(this).data('actions')
                     && $(this).data('actions') === 'yes'
                     ) {

                         columns.push({
                             "orderable" : false
                         });

                         // columns.push({
                         //     "orderable" : false,
                         //     "data" : '',
                         //     "render": function ( data, type, row, meta ) {
                         //
                         //         var row = meta.row;
                         //         var column = meta.col;
                         //         var html = row[column];
                         //         // console.log('data = ' + data);
                         //         // console.log('type = ' + type);
                         //         // console.log('row', row);
                         //         // console.log('meta', meta);
                         //         return html;
                         //     }
                         // });

                     } else if (undefined !== $(this).data('order')
                      && $(this).data('order') === 'yes'
                     ) {

                         columns.push({ "orderable" : true });
                         var dir = $(this).data('dir');
                         direction.push([ index, dir]);

                     } else {
                         columns.push(null);
                     }

                 });

                 $(this).DataTable({
                     "colReorder": true,
                     "responsive": true,
                     "processing": true,
                     "serverSide": true,
                     "ajax": url,
                     "columns": columns,
                     "order": direction,
                     "language": {
                         "decimal":        "",
                         "emptyTable":     "Nenhum registro encontrado",
                         "info":           "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                         "infoEmpty":      "Mostrando 0 até 0 de 0 registros",
                         "infoFiltered":   "(_MAX_ registros filtrados)",
                         "infoPostFix":    "",
                         "thousands":      ".",
                         "lengthMenu":     "Exibir _MENU_ itens",
                         "loadingRecords": "Carregando...",
                         "processing":     "Processando...",
                         "search":         "Pesquisar:",
                         "zeroRecords":    "Nenhum registro encontrado",
                         "paginate": {
                             "first":      "Primeiro",
                             "last":       "Último",
                             "next":       "Próximo",
                             "previous":   "Anterior"
                         },
                         "aria": {
                             "sortAscending":  ": Ordenar colunas de forma ascendente",
                             "sortDescending": ": Ordenar colunas de forma descendente"
                         }
                     }
                 }).on( 'draw.dt', function (e, settings) {

                     // Aqui acontece a personalização em tempo real
                     var table = $('#' + settings.sTableId);

                     // Adiciona a classe para identificar a coluna de actions
                     var column = $('[data-actions="yes"]', table).index();
                     if (column >= 0) {
                         $('tbody tr', table).each(function(){
                             $('td:eq(' + column + ')', this).addClass('column-actions');
                         });
                     }

                 });

             });

             // Rotina de recarregamento do datagrid
             window.datagridReload = function() {

                 $('[data-plugin="datatable"]').each(function(){
                     $(this).DataTable().ajax.reload();
                 });

             };

             // Configura a rotina de exclusão
             window.destroyRegister = function(url) {

                 Swal.fire({
                     title: 'Você tem certeza?',
                     text: "Você está prestes a remover este item!",
                     type: 'warning',
                     showCancelButton: true,
                     confirmButtonText: 'Sim, remover!',
                     cancelButtonText: 'Não, cancelar!',
                     confirmButtonClass: 'btn btn-success mt-2',
                     cancelButtonClass: 'btn btn-danger ml-2 mt-2',
                     buttonsStyling: false
                 }).then(function (result) {

                     if (result.dismiss === 'cancel') {

                         Swal.fire({
                             title: 'Cancelado',
                             text: "Nada foi efetuado!",
                             type: 'error',
                             confirmButtonClass: 'btn btn-confirm mt-2'
                         });

                     } else {

                         var csrf = $('[name="csrf-token"]').attr('content');

                         $.ajax({
                              url: url,
                              data: {
                                  _method: 'DELETE', // https://laravel.com/docs/5.5/controllers#resource-controllers
                                  _token: csrf, // https://laravel.com/docs/5.6/csrf
                              },
                              method: 'post',
                              dataType: 'json',
                              success: function(data, text_status, jq_xhr) {

                                  if (undefined !== data.status && data.status == 'success') {

                                      Swal.fire({
                                          title: 'Excluído!',
                                          text: "O item foi excluído",
                                          type: 'success',
                                          confirmButtonClass: 'btn btn-confirm mt-2'
                                      }).then(function (result) {

                                          // Recarrega o grid
                                          var grid = $('[data-plugin="datatable"]').get(0);
                                          $(grid).DataTable().draw();

                                      });

                                  } else {

                                      Swal.fire({
                                          title: 'Erro!',
                                          text: "Uma resposta inválida foi devolvida pela operação!",
                                          type: 'error',
                                          confirmButtonClass: 'btn btn-confirm mt-2'
                                      });

                                  }

                              },
                              error: function(jq_xhr, text_status, error_thrown) {

                                  var error_message = undefined !== jq_xhr.responseJSON
                                                   && undefined !== jq_xhr.responseJSON.message
                                    ? jq_xhr.responseJSON.message
                                    : jq_xhr.responseText;

                                  if (error_message !== '') {
                                      error_message = ': ' + error_message;
                                  }

                                  Swal.fire({
                                      title: 'Erro!',
                                      text: "A operação resultou em um erro" + error_message,
                                      type: 'error',
                                      confirmButtonClass: 'btn btn-confirm mt-2'
                                  });

                              }
                        });

                     }
                 });

             };

         },

         initAutonumber: function(context)
         {
             $('[data-plugin="autonumber"]', context).each(function(){

                 var type = $(this).data('type');

                 if (type == 'money') {

                     var language = $(this).data('language');
                     new AutoNumeric(this, AutoNumeric.getPredefinedOptions()[language]);

                 } else if(type == 'range') {

                     var min    = $(this).data('min');
                     var max    = $(this).data('max');
                     var format = $(this).data('format'); // numeric|float|code

                     var settings = {};

                     switch (format) {
                        case 'numeric':
                            settings.allowDecimalPadding = false;
                            settings.digitGroupSeparator = '.';
                            settings.decimalCharacter = ',';
                            break;
                        case 'float':
                           settings.allowDecimalPadding = true;
                           settings.digitGroupSeparator = '.';
                           settings.decimalCharacter = ',';
                           break;
                        case 'code':
                           settings.allowDecimalPadding = false;
                           settings.digitGroupSeparator = '';
                           settings.decimalCharacter = ',';
                           break;
                     }

                     if (undefined !== min && min !== 'none') {
                         settings.minimumValue = min;
                     }
                     if (undefined !== max && max !== 'none') {
                         settings.maximumValue = max;
                     }
                     new AutoNumeric(this, settings);
                 }

            });
         },

         initInputmask: function(context)
         {
             $('[data-plugin="inputmask"]', context).each(function(){

                 var mask = $(this).data('mask');

                 if (mask.indexOf('|') !== -1) {
                     mask = mask.split('|');
                 }

                 var im = new Inputmask({
                     mask : mask,
                     greedy: false,
                     clearMaskOnLostFocus: true
                     //clearIncomplete: true
                 });
                 im.mask(this);

            });
         },

         initCustomModal: function()
         {
             // Configura a rotina de abertura do modal
             // usada nas ações do grid
             window.openModalForm = function(url, callback) {

                 $('#main-modal').remove();

                 // Disponibiliza os parâmetros de formulários existentes
                 // para a requisição ajax
                var form_params = {};
                var form_index  = 0;
                var form_assoc  = '';
                $('.js-crud-form').each(function(){

                    // Traduz o indice numerico para string, a fim de ficar mais visual
                    // no momento de capturar os valores na requisição
                    switch(form_index){
                        case 0: form_assoc = 'parent_form_one'; break;
                        case 1: form_assoc = 'parent_form_two'; break;
                        case 2: form_assoc = 'parent_form_three'; break;
                        case 3: form_assoc = 'parent_form_four'; break;
                        case 4: form_assoc = 'parent_form_five'; break;
                        case 5: form_assoc = 'parent_form_six'; break;
                        case 6: form_assoc = 'parent_form_seven'; break;
                        case 7: form_assoc = 'parent_form_eight'; break;
                        case 8: form_assoc = 'parent_form_nine'; break;
                        case 9: form_assoc = 'parent_form_ten'; break;
                    }

                    form_params[form_assoc] = {};

                    $('.js-crud-form [name]').each(function(){

                        // Pega o parâmetro
                        var name = $(this).attr('name');
                        if (name !== '_token' && name !== '_method') {

                            if (name.substr(-2) == '[]'){
                                name = name.replace('[]', '');
                            }

                            form_params[form_assoc][name] = $(this).val();
                        }
                    });

                    form_index = form_index+1;
                });

                 $.ajax({
                      url: url,
                      method: 'get',
                      data: form_params,
                      dataType: 'html',
                      success: function(data, text_status, jq_xhr) {

                          if (undefined !== data) {

                              // Adiciona o modal no DOM e exibe-o
                              $(data).appendTo('body');
                              $('#main-modal').modal('show');

                              // Carrega os eventos e plugins no conteúdo do modal
                              new GlobalFeatures('#main-modal');

                              // Prepara o formulário para funcionar por AJAX
                              var action = $('#main-modal form').attr('action');
                              $('#main-modal form').attr('onsubmit', 'return false;').removeAttr('action');
                              console.log(action);

                              // Move a mensagem de erro para se adequar ao modal
                              $('#main-modal #form-error-message').attr('id', 'form-modal-error-message');
                              $('#form-modal-error-message').prependTo("#main-modal .modal-body");

                              // Adiciona a mensagem de sucesso oculta
                              $(''
                                + '<div id="form-modal-success-message" class="alert alert-success w-100" style="display: none;">'
                                + 'Operação efetuada com sucesso!'
                                + '</div>'
                              ).prependTo("#main-modal .modal-body");

                              $('#main-modal form').submit(function(){

                                  // Parâmetros do formulário
                                  var params = {};
                                  $('#main-modal form [name]').each(function(){

                                      // Pega o parâmetro
                                      var name = $(this).attr('name');
                                      params[name] = $(this).val();

                                      // Limpa o formulário
                                      $('#main-modal form [name="'+name+'"]').removeClass('is-invalid');
                                      $('#'+name+'-help')
                                           .removeClass('text-muted')
                                           .removeClass('text-danger')
                                           .addClass('text-muted').html('');
                                  });

                                  // Limpa mensagens de operações anteriores
                                  $('#form-modal-success-message').hide();
                                  $('#form-modal-error-message').html('').hide();

                                  // Se for edição, a gravação acontece por PUT
                                  if (params['form_type'] === 'edit') {
                                        params['_method'] = 'PUT'; // https://laravel.com/docs/5.5/controllers#resource-controllers
                                  }

                                  $.ajax({
                                       url: action,
                                       method: 'post',
                                       data: params,
                                       dataType: 'json',
                                       success: function(data, text_status, jq_xhr) {
                                           $('#form-modal-success-message').show();

                                           if (callback !== '') {
                                               window[callback]();
                                           }

                                       },
                                       error: function(jq_xhr, text_status, error_thrown) {

                                           var form_errors = undefined !== jq_xhr.responseJSON
                                                          && undefined !== jq_xhr.responseJSON.errors
                                                ? jq_xhr.responseJSON.errors
                                                : null;

                                           var error_message = undefined !== jq_xhr.responseJSON
                                                            && undefined !== jq_xhr.responseJSON.message
                                                ? jq_xhr.responseJSON.message
                                                : jq_xhr.responseText;

                                           if (form_errors !== null) {

                                               // Erro de formulário
                                               var message = null;
                                               $.each(form_errors, function(name, data){

                                                   if (message === null) {
                                                      message = data[0];
                                                   }

                                                   $('#main-modal form [name="'+name+'"]').addClass('is-invalid');
                                                   $('#'+name+'-help')
                                                        .removeClass('text-muted')
                                                        .removeClass('text-danger')
                                                        .addClass('text-danger').html(data[0]);
                                               });

                                               $('#form-modal-error-message').html(message).show();

                                           } else {

                                               // Erro mais grave
                                               error_message = (error_message !== '')
                                                    ? error_message
                                                    : 'A operação resultou em um erro!';

                                                Swal.fire({
                                                    title: 'Erro!',
                                                    text: error_message,
                                                    type: 'error',
                                                    confirmButtonClass: 'btn btn-confirm mt-2'
                                                });
                                           }

                                       }
                                 });

                              });

                          } else {

                              Swal.fire({
                                  title: 'Erro!',
                                  text: "Uma resposta inválida foi devolvida pela operação!",
                                  type: 'error',
                                  confirmButtonClass: 'btn btn-confirm mt-2'
                              });

                          }

                      },
                      error: function(jq_xhr, text_status, error_thrown) {

                          var error_message = undefined !== jq_xhr.responseJSON
                                           && undefined !== jq_xhr.responseJSON.message
                            ? jq_xhr.responseJSON.message
                            : jq_xhr.responseText;

                          if (error_message !== '') {
                              error_message = ': ' + error_message;
                          }

                          Swal.fire({
                              title: 'Erro!',
                              text: "A operação resultou em um erro" + error_message,
                              type: 'error',
                              confirmButtonClass: 'btn btn-confirm mt-2'
                          });

                      }
                });

            };


        },


         // Formulaŕio
         initForm : function()
         {

         }

    };

    $(document).ready(function(){

        new GlobalFeatures;
    });

})(jQuery);
