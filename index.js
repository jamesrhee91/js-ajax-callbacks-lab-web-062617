$(document).ready(function (){

  $('#search-link').click(searchRepositories)
  $('#results').on('click', function(event) {
    if (event.target && event.target.nodeName == 'A') {
      event.preventDefault()
      showCommits(event.target)
    }
  })

});

function searchRepositories() {
  const userInput = $('#searchTerms').val()

  $.ajax({
    url: `https://api.github.com/search/repositories?q=${userInput}`,
    method: 'GET',
    success: function(repositories) {
      const repoLIs = repositories.items.map(repo => {
        return `<li>${repo.name}, ${repo.description}, ${repo.html_url}, ${repo.owner.login}, ${repo.owner.avatar_url}, ${repo.owner.html_url}, <a data-repository="${repo.name}" data-owner="${repo.owner.login}" id="commits">Show commits</a></li>`}).join("")
      // , ${repo.description}, ${repo.html_url}, ${repo.owner.login}, ${repo.owner.avatar_url}, ${repo.owner.html_url}, showCommits
      // debugger
      const template = `
      <ul>
      ${repoLIs}
      </ul>
      `
      $('#results').html(template)
    }, // close success function
    error: function(error) {
      // debugger
      displayError(error)
    }

  })
}

function displayError(error) {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(element) {

  $.ajax({
    url: `https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`,
    method: 'GET',
    success: function(commits) {
      const commitLIs = commits.map(commit => {
        // debugger
        return `<li>${commit.author.login}, ${commit.sha}, ${commit.author.avatar_url}</li>`}).join("")
      const template = `
      <ul>
      ${commitLIs}
      </ul>
      `
      $('#details').html(template)
    } // close success function

  })
}
