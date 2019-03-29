$(document).ready(function(){
	const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
	const format = '&format=json';

	let zipcode = $('#zipcode'); let city = $('#city'); let errorMessage = $('#error-message'); 

	$(zipcode).on('blur', function(){
		let code = $(this).val();
		//console.log(code);
		let url = apiUrl+code+format;
		//console.log(url);

		fetch(url, {method: 'get'}).then(response => response.json()).then(results => {
			//console.log(results);
			$(city).find('option').remove();
			if(results.length){
				$(errorMessage).text('').hide();
				$.each(results, function(key, value){
					//console.log(value);
					console.log(value.nom);
					$(city).append('<option value="'+value.nom+'">'+value.nom+'</option>');
				});
			}
			else{
				if($(zipcode).val()){
					console.log('Erreur de code postal.');
					$(errorMessage).text('Aucune commmune avec ce code postal.').show();
				}
				else{
					$(errorMessage).text('').hide();
				}
			}
		}).catch(err => {
			console.log(err);
			$(city).find('option').remove();
		});
	});
});